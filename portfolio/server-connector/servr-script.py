import datetime as dt
import logging
import os
import pathlib
import subprocess
import sys
import time as t
import webbrowser

import pynput.keyboard as ky
import win32.lib.win32con as wgui
import win32api as wapi
import win32process as wproc

keyboard = ky.Controller()

CUR_DIR = __file__.rpartition('\\')[0]

desktop_dir = str(pathlib.Path.home() / 'Desktop')

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

# TODO INFO NEEDED: 
    # IP
    # wipe time

# ? USE LINK steam://connect/rtg.rustoria.us:28015


# * PSEUDO

# WINDOW OPEN

server_ip = str(input("Rust server IP address: "))



#input for ip address, choose wipetimes from dropdown
#click "Start", timer starts, shows server status, time till 
#connect, TO STEAM LINK, this will open program and focus
#automatically, THEN check for server status if connecting, 
# ? use api to check when connected?
# ? use screen input to check when connecting?
#when connecting / connected, start anti afk script

    #