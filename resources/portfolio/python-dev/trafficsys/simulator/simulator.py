import datetime
import os
import pickle
import random
import sys
import time

# ? Appends parents folders (in this case, the register library)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from register.fillregister import RegBil
from settings import Config
from utils import gen_dates_list, loading_task, prompt_help


#TODO ADD DOCSTRING TO CLASS AND METHODS
class SimBil(RegBil):
    def __init__(
        self,
        id,
        brand,
        model,
        owner,
        fuel,
        date: datetime.date,
        hour: int
        ):
        
        super().__init__(id, brand, model, owner, fuel)
        self.date = date
        self.hour = hour


class Simulator():
    def __init__(
        self,
        target_file: str,
        source_file: str,
        min: int=10,
        max: int=100,
        years: int=1,
        data: dict={
            "data":[],
            "totals":[]
        },
        car_count: int=0,
        sim_start: float=time.time(),
        days_list: list=[]

        ):

        self.min = min
        self.max = max
        self.years = years
        self.target_file = target_file,
        self.source_file = source_file
        self.data = data
        self.car_count = car_count
        self.sim_start = sim_start
        self.days_list = days_list

    def simulate(self):
        print('\n')
        dict_start = time.time()

        with open(self.source_file, 'rb') as register_file:
            print(f'\rLoading register...',end=' ')
            register = pickle.load(register_file)
            register = register["register"]

        len_elec = len(register["electric"]) - 1
        len_foss = len(register["gas"]) - 1
        
        days_list = gen_dates_list(self.years, 2022)

        hour_count = 0
        hour_total = 0

        for day in days_list:
            day_total = 0
            hour_totals = []

            for hour in range(24):
                
                hour_total = 0

                max = self.max / 2
                if 10 > hour > 6 or 19 > hour > 14:
                    max = self.max

                for i in range(random.randint(self.min, max)):
                    self.car_count += 1

                    if random.randint(0,1):
                        proxCar = register["electric"][
                        random.randint(0,len_elec)]

                    else:
                        proxCar = register["gas"][
                        random.randint(0,len_foss)]

                    self.data['data'].append(
                        SimBil(
                            proxCar["id"],
                            proxCar["brand"],
                            proxCar["model"],
                            proxCar["owner"],
                            proxCar["fuel"],
                            date = day, 
                            hour = i
                        ).__dict__
                    )
                    hour_total += 1
                hour_totals.append(hour_total)
                print(f"\rSimulating drives, "
                + f" {hour_count+1}/{self.years * 8760} hours, ", end=' '
                )
                hour_count += 1
            self.data["totals"].append(
                {
                    "total":sum(hour_totals),
                    "hour_totals":hour_totals
                    # ? which hour and which day is implicit by list index                         
                }
            )
                  
        print(
            f'\rSimulation done.      Elapsed time:   '
            + f'{round(time.time() - dict_start,2)}s     '
            + f'                                       \n'
        )
        del register
    
    def dump_data(self):
        load_start = time.time()
            
        def dump_data_obj():
            with open(self.target_file[0], "wb") as file:
                pickle.dump(self.data, file)
            del self.data

        dumped = False

        loading_task(
            prompt='Loading data object to data.pkl', 
            bool=dumped,
            func=dump_data_obj
        )

        print(
            f"\rLoaded to .pkl.        Elapsed time:   "
            + f"{round(time.time() - load_start,2)}s"
            + "                "
        )

        print(
            f'\nSimulation created.   Total time:     '
            + f'{round(time.time() - self.sim_start,2)}s\n'
        )


#TODO COMMENT OUT ACTUAL SCRIPT CODE
if Config.show_help_prompts:
    prompt_help("\nSee help for simulator.py? ", [SimBil, Simulator])

if __name__ == "__main__":
    CURRENT_DIR = __file__[:len(__file__) - len("simulator.py")]
    source_file_path = CURRENT_DIR[:len(CURRENT_DIR) - len("simulator/")]
    source_file_path += "\\register\\register.pkl"
    simulator = Simulator(
        min = Config.sim_hour_min,
        max = Config.sim_hour_max,
        years = Config.sim_years,
        target_file = f'{CURRENT_DIR}\\data.pkl',
        source_file = source_file_path
    )

    simulator.simulate()
    simulator.dump_data()