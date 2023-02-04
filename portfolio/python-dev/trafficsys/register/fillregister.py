import csv
import os
import pickle
import random
import sys
import time

# ? Appends parents folders (in this case, the register library)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from settings import Config
from utils import gen_number_plate, loading_task, prompt_help


#TODO DOCSTRING CLASS AND ALL METHODS
class RegBil:
    def __init__(
        self, 
        id: str, 
        brand: str, 
        model: str,
        owner: str,
        fuel: str
        ):

        self.id = id
        self.brand = brand
        self.model = model
        self.owner = owner
        self.fuel = fuel

#TODO DOCSTRING CLASS AND ALL METHODS
class Register():
    def __init__(
        self,
        target_file: str,
        models_file: str,
        names_file: str,
        amt: int=100000,
        data: dict={
            "register":{
            "electric":[],
            "gas":[]}
        },
        reg_start: float=time.time()
        ):

        self.target_file = target_file
        self.models_file = models_file
        self.names_file = names_file
        self.amt = amt
        self.data = data
        self.reg_start = reg_start
    

    def create_register(self):
        dict_start = time.time()
        models = []
        fuels = ['electric','gasoline','diesel']

        with open(self.models_file, "r") as models:
            csvreader = csv.reader(models)
            header = next(csvreader)
            models=[]

            for row in csvreader:
                models.append(
                    [
                        row[1], 
                        row[2]+" "+row[0],
                        fuels[random.randint(0,2)]
                    ]
                )

        car_count = 0
        names = []

        with open(self.names_file, "r") as names:
            csvreader = csv.reader(names)
            header = next(csvreader)
            names = []

            for row in csvreader:
                names.append(row[0])

        print('\n')
        name_index = 0
        names_len = len(names)
        for i in range(self.amt):
            if name_index == names_len - 1:
                name_index = 0

            build = models[random.randint(0,len(models)-1)]

            car = RegBil(
                gen_number_plate(),
                build[0],
                build[1],
                names[name_index],
                build[2]
            )

            if build[2]=="electric":
                self.data['register']['electric'].append(car.__dict__)

            else:
                self.data['register']['gas'].append(car.__dict__)
                
            car_count += 1
            name_index += 1
            print(
                f"\rAdding cars to dict object {car_count}/{self.amt}",end=' '
            )
        
        print(
            f"\rDict created.         Elapsed time:"
            + f"   {round(time.time() - dict_start,2)}s"
            + f"                                                     \n"
        )
        del names, models

    def dump_data(self):
        load_start = time.time()

        def dump_data_obj():
            with open(self.target_file, 'wb') as file:    
                pickle.dump(self.data, file)
            del self.data
        
        dumped = False

        loading_task(
            prompt='Loading register object to register.pkl', 
            bool=dumped,
            func=dump_data_obj
        )

        print(
            f"\rLoaded to .pkl.        Elapsed time:   "
            + f"{round(time.time() - load_start,2)}s"
            + "                "
        )

        print(
            f'\nRegister created.     Total time:     '
            + f'{round(time.time() - self.reg_start,2)}s\n'
        )

#TODO COMMENT OUT ACTUAL SCRIPT PARTS
if Config.show_help_prompts:
    prompt_help("\nSee help for fillregister.py?", [RegBil, Register])

if __name__ == "__main__":
    CURRENT_DIR = __file__ [:len(__file__) - len("fillregister.py")]
    register = Register(
        target_file = f'{CURRENT_DIR}\\register.pkl',           
        models_file = f'{CURRENT_DIR}\\data\\models.csv',
        names_file = f'{CURRENT_DIR}\\data\\names.csv',
        amt = Config.reg_amount
    )

    register.create_register()
    register.dump_data()