"""Utilities module

This file contains various functions that can be usefule for the various
scripts and modules in the project and are therefore neatly packaged into 
one multi-purpose module to be used wherever needed. 

This file is only meant to be imported as as a module and contains 
the following functions:

    * get_max_values - returns a list of indexes of multiple max values of a list
    * cmd_input - prompts a yes/no option to run a function in the terminal/console
    * prompt_help - prompts a yes/no option to see the help of a list of classes 
    * gen_dates_list - returns a list of datetime date objects
    * loading_task - shows loading dots in the terminal/console with a function 
    * gen_number_plate - generates a random numberplate
"""

import calendar
import itertools
import random
import string
import sys
import threading
import time


# TODO document all functions like this first one
def get_max_values(values:list):
    """Returns a list of indexes of multiple max values of a list

    Parameters
    ----------
    values : list 
        A list of values 

    Returns
    -------
    list
        a list of indexes of multiple same max values of the given input list
    """
    max_val = max(values)
    max_val_index = values.index(max_val)
    max_val_indexes = []
    values_found = False
    values_len = len(values)
    while values_found == False:
        try:
            max_val_indexes.append(max_val_index)
            max_val_index = values.index(max_val,max_val_index+1,values_len)
        except ValueError:
            values_found = True
    return max_val_indexes

def cmd_input(prompt:str, func, args={}):
    """Main desc.

    Parameters
    ----------
    param1 : type
        Description
    param1 : type
        Description

    Returns
    -------
    type
        description
    """
    valid = False
    while valid == False:
        var = str(input(f'{prompt} [y/n] : '))
        if var in ['y','Y','yes','Yes','YES']:
            valid = True
            func(**args)
        elif var in ['n','N','no','No','NO']:
            valid = True
        else:
            print('\nInvalid input! Try again')

def prompt_help(prompt:str, classes:list):
    valid = False
    while valid == False:
        var = str(input(f'{prompt} [y/n] : '))
        if var in ['y','Y','yes','Yes','YES']:
            for classObj in classes:
                help(classObj)
            valid = True
        elif var in ['n','N','no','No','NO']:
            valid = True
        else:
            print('\nInvalid input! Try again')

def gen_dates_list(years: int=1, start:int=2022):
    dates = []

    for year in range(years):
        obj = calendar.Calendar().yeardatescalendar(year + start, width=12)
        for month in obj[0]:
            for week in month:
                for day in week:
                    if day.year != year + start:
                        continue
                    dates.append(day)
    
    dates = list(dict.fromkeys(dates))
    return dates

def loading_task(prompt:str, bool, func, args={}):
    bool = False
    def loading_str():

        for x in itertools.cycle(["   ",".  ",".. ","..."]):

            if bool:
                break
            
            sys.stdout.write(
                f'\r{prompt}{x}'
            )
            sys.stdout.flush()
            time.sleep(0.2)
    load_str = threading.Thread(target=loading_str)
    load_str.start()

    func(**args)

    bool = True

def gen_number_plate():
    letters = ''.join(random.choices(string.ascii_uppercase, k=2))
    numbers = random.randint(10000, 100000)

    return f'{letters}-{numbers}'