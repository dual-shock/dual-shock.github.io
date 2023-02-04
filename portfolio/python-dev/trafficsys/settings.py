"""Settings config file

This is a simple config file containing a class with various property 
variables that can be adjusted to run the program with specific numbers
and in specific ways, such as removing prompts and changing simulation 
variables. 

This file is only meant to be imported as a module.

"""
class Config():
    """
    Config class with various config variables for the program 

    ...

    Attributes
    ----------
    turn_on_prompts : bool
        turns off ALL prompts and auto runs all scripts if set to False
    show_help_prompts : bool
        prompts to show help for the classes in the script and packages
    prompt_reg_gen : bool
        prompts to generate a new register 
    prompt_sim_gen : bool
        prompts to simulate driving
    reg_amount : int
        how many car objects to add to the register
    sim_hour_min : int
        min amount of cars that can pass pr. hour in the simulation 
    sim_hour_max : int
        max amount of cars that can pass pr. hour in the simulation 
    sim_years : int
        amount of years to run the simulation 
    """
    turn_on_prompts = True
    show_help_prompts = True
    prompt_reg_gen = True
    prompt_sim_gen = True

    reg_amount = 100000

    sim_hour_min = 30
    sim_hour_max = 100
    sim_years = 1