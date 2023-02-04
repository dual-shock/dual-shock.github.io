"""Main runner for the traffic system simulator

This script (optionally) generates a register, (optionally) simulates 
car traffic past a point, and then analyzes the data from this simulation. 

The entire project does not require any non-standard modules or packages 
to be installed in the environment. 

This file is not meant to be imported as a module. 

"""
# TODO add gc.collect to del statements

import pickle
import time

from register.fillregister import Register
from settings import Config
from simulator.simulator import Simulator
from utils import cmd_input, gen_dates_list, get_max_values, prompt_help


# TODO DOCUMENT CLASS AND METHODS LIKE IN SETTINGS.PY
class Display():
    """
    A class that displays the stats of the simulation

    ...

    Attributes
    ---------

    """
    def __init__(
        self,
        source_file: str,
        start: float=time.time()
        ):

        self.source_file = source_file
        self.start = start


    def stats(self):
        max_days = []

        dict_start = time.time()

        print('\n')

        with open(self.source_file, 'rb') as data_file:
            data = pickle.load(data_file)
            totals = data['totals']
            data_list = data['data']

        day_totals = [day['total'] for day in totals]

        years = int(len(day_totals)/365)
        days_list = gen_dates_list(years, data_list[0]['date'].year)

        max_day_indexes = get_max_values(day_totals)

        print(
            f'\rData analyzed.        Elapsed time:   '
            + f'{round(time.time() - dict_start)}s  '
            + f'                                 '
        )

        print(
            f'\nRESULTS:\n\nMax passings in a day was:  [{max(day_totals)}]'
            + f'\nDay(s) with this amt of passings was:\n'
        )

        for day_index in max_day_indexes:
                hour_totals = []

                for hour in totals[day_index]['hour_totals']:
                    hour_totals.append(hour)

                max_hour_indexes = get_max_values(hour_totals)

                print(
                    f'↓ {days_list[day_index]}\n',
                    f'   Max passings in an hour this day was: [{max(hour_totals)}]\n'
                    f'  ↓ Hour(s) with this amt of passings was:'
                )

                for hour_index in max_hour_indexes:
                    print(
                        f'      {hour_index}:00-{hour_index+1}:00'
                    )

        del data, totals, data_list
        

# TODO Give all functions docstrings
def create_register():
    reg_path = f'{CURRENT_DIR}register\\'
    register = Register(
        target_file = f'{reg_path}register.pkl',           
        models_file = f'{reg_path}data\\models.csv',
        names_file = f'{reg_path}data\\names.csv',
        amt = Config.reg_amount    
    )
    register.create_register()
    register.dump_data()

def create_simulator():
    simulator = Simulator(
        min = Config.sim_hour_min,       
        max = Config.sim_hour_max, 
        years = Config.sim_years, 

        target_file = f'{CURRENT_DIR}\\simulator\\data.pkl',
        source_file = f'{CURRENT_DIR}\\register\\register.pkl'
    )
    simulator.simulate()
    simulator.dump_data()


if __name__ == "__main__":
    # TODO Comment from down here, aka actual script parts
    if Config.turn_on_prompts and Config.show_help_prompts: 
        prompt_help('\nSee help for main.py?', [Display])


    CURRENT_DIR = __file__[:len(__file__) - len("main.py")]

    display = Display(
        source_file = f'{CURRENT_DIR}\\simulator\\data.pkl'
    )

    if Config.turn_on_prompts and Config.prompt_reg_gen:
        with open(f'{CURRENT_DIR}register\\register.pkl', 'rb') as file:
            register = pickle.load(file)['register']
            register_length = len(register["electric"]) + len(register["gas"])
            del register

        cmd_input(
            f'\nFill the register with {Config.reg_amount} random cars? (current car amt in register: {register_length}',
            create_register
        )

    if Config.turn_on_prompts and Config.prompt_sim_gen:
        cmd_input(
            f'\nSimulate cars passing registration point for {Config.sim_years} year(s)?',
            create_simulator
        )

    display.stats()