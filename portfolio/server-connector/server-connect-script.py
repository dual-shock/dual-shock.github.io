#pyinstaller --onefile -i"logo.ico" Prosjekt-Rust.py
import logging
import os
import pathlib
import subprocess
import sys
from datetime import datetime
from time import ctime, sleep, time

import win32.lib.win32con as win32con
import win32.lib.win32con as win32gui
import win32api as wapi
import win32process as wproc
from numpy.core.numeric import full
from pynput.keyboard import *


def logger():
    logging.debug("debug info")
    logging.info("general info")
    logging.error("uh oh :(")
def main():
    level = logging.debug
    fmt = '[%(levelname)s] %(asctime)s - %(message)s'
    logging.basicConfig(level=level, format=fmt)
    logger()
    

os.system("")

keyboard = Controller()

__location__ = os.path.realpath(  
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


print(type(__location__))
programToFind = "Rust"


if False:
    class col():
        red = '\033[31m'
        gre = '\033[32m'
        yel = '\033[33m'
        cya = '\033[36m'
        und = '\033[4m'
        res = '\033[0m'

    def haveYou(input):
        if input == "Y" or input == "y" or input == "Yes" or input == "YES" or input == "yes":
            return True
        if input == "N" or input == "n" or input == "no" or input == "NO" or input == "No":
            return False
        else:
            return "invalid"

    sleep(1)
    print(f"{col.red}\n================!!!IMPORTANT!!!==============={col.res}")
    sleep(0.5)
    print("\n Step 1:\tFor the program to be more accurate in timing you should have the", col.cya,
        "Game Overlay", col.res, "Activity setting", col.gre, "Enabled", col.res, "on discord")
    sleep(0.5)
    print("\n Step 2:\tIf your game is ALREADY open, make sure your screen mode is either borderless or windowed, if you do not have your game open disregard this step")
    sleep(0.5)
    print("\n        \tTo do this > open your game > open your menu > click OPTIONS > click SCREEN > set the screen MODE to either Borderless or Windowd > click APPLY CHANGES")
    sleep(0.5)
    screenModeInput = str(input("\n\n Is your screen mode correct? [Y/N] : "))
    sleep(0.5)
    while haveYou(screenModeInput) != True:
        if haveYou(screenModeInput) == False:
            print("\n Ok, please turn the setting on and restart the script")
            sleep(0.5)
            print("\n Program closing")
            sleep(3)
            raise SystemExit
        if haveYou(screenModeInput) == "invalid":
            print("\n Invalid input, try again")
            sleep(0.5)
            screenModeInput = str(
                input("\n\n Is your screen mode correct? [Y/N] : "))
    sleep(0.5)
    print("\n Step 3:\tMake sure you have a rust shortcut on your desktop, the program will now check this for you . . .")
    sleep(2)
    # CHECK FOR RUST DESKTOP SHORTCUT

    desktopPath = str(pathlib.Path.home() / 'Desktop')

    # FIX DESKTOP PATH NOT ALWAYS BEING RIGHt


    # defines desktop variable for the shortcut
    rustShortcut = desktopPath + "\Rust.lnk"

    # declares the full path for the placement of possible rust shortcut
    rawRustShortcut = r'%s ' % rustShortcut

    # checks if that path (aka the shortcut) exists
    if os.path.exists(rawRustShortcut) != True:
        print("\n there is", col.red, "not", col.res,
            "a shortcut for rust present on your desktop, please create one and restart the program")
        sleep(0.5)
        print("\n Program closing")
        sleep(5)
        raise SystemExit

    print("\n Rust shortcut", col.gre, "present",
        col.res, "on desktop, continuing program")
    sleep(2)


    # declares projFolder as path for this folder
    projFolder = os.path.join(__location__)

    projFolder = r'%s' % projFolder  # converts that into a real string

    errorCheckZero = False

    # FIRST STATEMENT
    print(col.cya, "\n What is the IP of the Rust server?", col.res)
    sleep(0.5)
    ipAddress = str(input("\n Paste the full ip"+col.yel+ " here : "+ col.res))
    while errorCheckZero == False:
        if ipAddress.count(":") < 1:
            print(col.red+"Error :\t\t"+col.res+"Missing colon")
            sleep(0.5)
            errorCheckZero = False
            ipAddress = str(input("\n Try again, paste the full ip"+col.yel+ " here : "+ col.res))
        tempIntAddress = str(ipAddress)
        tempIntAddress = tempIntAddress.split(":")
        tempIntAddress = str(tempIntAddress[0]+tempIntAddress[1])
        tempIntAddress = tempIntAddress.split(".")
        fullTempIntAddress = ""
        for x in range(0,len(tempIntAddress)):
            fullTempIntAddress = fullTempIntAddress + str(tempIntAddress[x])
        if ipAddress.count(".") < 3:
            print(col.red+"Error :\t\t"+col.res+"Invalid ip, missing period")
            sleep(0.5)
            errorCheckZero = False
            ipAddress = str(input("\n Try again, paste the full ip"+col.yel+ " here : "+ col.res))
        if fullTempIntAddress.isnumeric() != True:
            print(col.red+"Error :\t\t"+col.res+"Invalid ip, no letters in ip")
            sleep(0.5)
            errorCheckZero = False
            ipAddress = str(input("\n Try again, paste the full ip"+col.yel+ " here : "+ col.res))
        else:
            print(col.gre+"\n\n Ip saved succsessfully !"+col.res)
            sleep(0.5)
            errorCheckZero = True

    sleep(0.5)
    print(col.cya + "\n What time is wipe for you?"+col.res +
        "\n\n give your answer in an"+ col.gre, "00:00 "+ col.res+ "format (YOUR LOCAL TIME)")



    sleep(0.5)
    print("\n For example;\t13:20\t23:40\t17:00\t . . .")
    sleep(0.5)

    # USER INPUT
    errorCheckOne = False
    # creates a variable for the users input
    wipeTimeInput = str(input("\n Give your answer"+col.yel+ " here : "+ col.res))
    sleep(0.2)


    while errorCheckOne == False:  # while the users input is invalid
        if wipeTimeInput.count(":") < 1:  # if there are no colons in the user input

            print(col.red+"Error :\t\t"+col.res+"Missing colon")
            sleep(0.5)

            errorCheckOne = False  # user input stays invalid

            wipeTimeInput = str(input("\n Try again, give your answer here : "))
        tempIntTime = str(wipeTimeInput)
        tempIntTime = tempIntTime.split(":")
        tempIntTime = str(tempIntTime[0]+tempIntTime[1])
        if len(wipeTimeInput) > 5:  # if there are too many characters in the user input

            print("\n"+col.red+"Error :\t\t"+col.res+"Too many charcters")
            sleep(0.5)

            errorCheckOne = False  # user input stays invalid

            # user needs to give input again
            wipeTimeInput = str(input("\n Try again, give your answer here : "))

            # user needs to give input again
        elif len(wipeTimeInput) < 5:  # if there are too few characters in the answer

            print(col.red+"Error :\t\t"+col.res+" too few characters")
            sleep(0.5)

            errorCheckOne = False  # user input stays invalid

            # user needs to give input again
            wipeTimeInput = str(input("\n Try again, give your answer here:   "))

        elif tempIntTime.isnumeric() != True:
            print(col.red+"Error :\t\t"+col.res+" no letters in input")
            sleep(0.5)
            errorCheckOne = False
            wipeTimeInput = str(input("\n Try again, give your answer here : "))
        elif int(tempIntTime) > 2400:
            print(col.red+"Error :\t\t"+col.res+" invalid time")
            sleep(0.5)
            errorCheckOne = False
            wipeTimeInput = str(input("\n Try again, give your answer here : "))
        else:  # if none of the error conditions are met

            __location__ = os.path.realpath(
                os.path.join(os.getcwd(), os.path.dirname(__file__)))  # declares __location__ as this folders path

            print(col.gre+"\n\n Wipe time saved succsessfully !"+col.res)
            sleep(0.5)
            print("\n\n The program will now initialize at the time of wipe,",
                col.red, "do not", col.res, "close it")

            errorCheckOne = True  # user input is valid

    wipeTime = str(wipeTimeInput)  # declares the temp var as the users input

    wipeTimeSplit = wipeTime.split(":")  # string stuff

    wipeHour = wipeTimeSplit[0]

    wipeMin = wipeTimeSplit[1]

    # 4 letter string of the time of wipe

    integerWipeTime = str(wipeTimeSplit[0]+wipeTimeSplit[1])


    def getCurrentTime():  # returns the time as a 4 letter string

        currentTime = datetime.now().strftime("%H:%M:%S")

        clockTimes = currentTime.split(":")
        #print(clockTimes)

        integerTime = str(clockTimes[0] + clockTimes[1])

        global currentHour

        currentHour = clockTimes[0]

        global currentMin

        currentMin = clockTimes[1]

        global currentSec

        currentSec = clockTimes[2]

        return integerTime



    # function for checking if a process exists, arg is the full process name.exe
    def getProcessStatus(process_name):

        call = 'TASKLIST', '/FI', 'imagename eq %s' % process_name

        output = subprocess.check_output(call).decode()

        last_line = output.strip().split('\r\n')[-1]

        return last_line.lower().startswith(process_name.lower())


    def connectToServer():  # simulates key presses for connecting via console      TOTAL TIME PER 20.4 sec

        keyboard.press(Key.f1)  # open console
        sleep(0.2)
        keyboard.release(Key.f1)

        sleep(5)  # lag timer

        keyboard.type("connect "+ ipAddress)  # connects to server
        sleep(10)  # lag time
        keyboard.tap(Key.enter)  # executes

        sleep(5)  # lag time

        keyboard.press(Key.f1)  # close console
        sleep(0.2)
        keyboard.release(Key.f1)


    def antiAfk():  # simulates keypresses for not getting afk kicked         TOTAL TIME PER 20 sec
        keyboard.press('c')
        sleep(5)
        keyboard.release('c')
        sleep(5)
        keyboard.press(Key.space)
        sleep(5)
        keyboard.release(Key.space)
        sleep(5)


    def window_enum_handler(hwnd, resultList):
        if win32gui.IsWindowVisible(hwnd) and win32gui.GetWindowText(hwnd) != '':
            resultList.append((hwnd, win32gui.GetWindowText(hwnd)))


    def get_app_list(handles=[]):
        mlst = []
        win32gui.EnumWindows(window_enum_handler, handles)
        for handle in handles:
            mlst.append(handle)
        return mlst


    windowsList = get_app_list()

    numberOfWindows = len(windowsList)

    while getCurrentTime() != integerWipeTime:  # while the return value of the WhatsTheTime function does not match the time of wipe, update the whats the time function

        getCurrentTime()

        currentHour = int(currentHour)
        wipeHour = int(wipeHour)
        currentMin = int(currentMin)
        wipeMin = int(wipeMin)
        currentSec = int(currentSec)

        if currentHour == wipeHour:

            if currentMin < wipeMin:

                HoursUntil = 0
                MinsUntil = wipeMin - currentMin

            if currentMin > wipeMin:

                HoursUntil = 23
                MinsUntil = (60 - currentMin) + wipeMin

        if currentHour < wipeHour:

            if currentMin < wipeMin:

                HoursUntil = wipeHour-currentHour
                MinsUntil = wipeMin - currentMin

            if currentMin > wipeMin:

                HoursUntil = (wipeHour - currentHour) - 1
                MinsUntil = (60 - currentMin) + wipeMin

        if currentHour > wipeHour:

            if currentMin < wipeMin:

                HoursUntil = (24 - currentHour) + wipeHour
                MinsUntil = wipeMin - currentMin

            if currentMin > wipeMin:

                HoursUntil = ((24 - currentHour) + wipeHour) - 1
                MinsUntil = (60 - currentMin) + wipeMin  # fix minute wrong bug

        print("", HoursUntil, "Hrs", MinsUntil-1, "Mins", 60 -
            currentSec, "Seconds", "until Initialization", end="\r")

        sleep(1)
    print("\n Program starting . . .")
    sleep(0.5)
    print("\n Checking if Rust is open")
    sleep(1)
    if getProcessStatus('RustClient.exe') == True:  # check if rust is open or not
        print("\n Rust is open")
        sleep(0.5)
        print("\n Locating window \n")
        sleep(0.5)
        for x in range(0, numberOfWindows):
            sleep(0.1)

            if programToFind == (str(windowsList[x]).split("'"))[1]:
                print("\tProgram nr\t", x, col.gre, "Match found\t",
                    col.res, (str(windowsList[x]).split("'"))[1])
                correctProgram = (str(windowsList[x]).split("'"))[1]
            else:
                print("\tProgram nr\t", x, col.red, "No match\t",
                    col.res, (str(windowsList[x]).split("'"))[1])

        handle = win32gui.FindWindow(None, correctProgram)
        print("\n Hooking window")
        if 1 == 1:
            try:

                win32gui.BringWindowToTop(handle)
                sleep(0.2)

                keyboard.press(Key.alt)
                win32gui.SetForegroundWindow(handle)
                sleep(0.5)

                keyboard.release(Key.alt)

                remote_thread, _ = wproc.GetWindowThreadProcessId(handle)
                wproc.AttachThreadInput(
                    wapi.GetCurrentThreadId(), remote_thread, True)
                win32gui.SetFocus(handle)
                sleep(0.2)

                win32gui.ShowWindow(handle, win32con.SW_MAXIMIZE)
                sleep(0.2)

                win32gui.BringWindowToTop(handle)
                sleep(0.2)

                win32gui.SetForegroundWindow(handle)
                sleep(0.2)

                win32gui.SetFocus(handle)
                sleep(0.2)
                print("\n Window hooked")
                sleep(1)

            except:

                print("\n", col.yel, "Expected error : ",
                    col.red, sys.exc_info(), col.res, "occurred")
                print("\n Program continuing")

        x = 1
        print("\n Window hooked")
        sleep(0.2)
        print("\n Connecting to server . . .")
        connectToServer()
        sleep(1)
        print("\n Anti afk kicker will start in 20 minutes . . .")
        for i in range(0,30):
            sleep(19.6)
            connectToServer()
        while x < 100:  # runs connect and anti afk 100 times

            connectToServer()

            sleep(1)

            antiAfk()

            sleep(1)

            x = x+1

    else:  # if it isnt open
        print("\n Rust not open, opening Rust\n")
        print("\n")
        os.startfile(rawRustShortcut)  # starts the DESKTOP SHORTCUT

        y = 1

        # checks 100 times if the discord hook is open, aka the game has reached main menu
        while getProcessStatus('DiscordHookHelper64.exe') != True:
            print("\n Checking if program is ready, check ", y, "/", "100", end="\r")
            if y < 100:

                sleep(0.5)

                y = y+1

            else:  # if none of the 100 checks come back as true TIME OUT the checking

                print("\n Checker timed out, skipping check")

                break
        print("\n ")
        sleep(15)  # waiting time to make sure the game boots up
        print("\n ")
        print("\n Locating window")
        windowsList = get_app_list()

        numberOfWindows = len(windowsList)
        for x in range(0, numberOfWindows):
            sleep(0.1)

            if programToFind == (str(windowsList[x]).split("'"))[1]:
                print("\tProgram nr\t", x, col.gre, "Match found\t",
                    col.res, (str(windowsList[x]).split("'"))[1])
                correctProgram = (str(windowsList[x]).split("'"))[1]
            else:
                print("\tProgram nr\t", x, col.red, "No match\t",
                    col.res, (str(windowsList[x]).split("'"))[1])

        handle = win32gui.FindWindow(None, correctProgram)
        print("\n Hooking window")
        if 1 == 1:
            try:

                win32gui.BringWindowToTop(handle)
                sleep(0.2)

                keyboard.press(Key.alt)
                win32gui.SetForegroundWindow(handle)
                sleep(0.5)

                keyboard.release(Key.alt)

                remote_thread, _ = wproc.GetWindowThreadProcessId(handle)
                wproc.AttachThreadInput(
                    wapi.GetCurrentThreadId(), remote_thread, True)
                win32gui.SetFocus(handle)
                sleep(0.2)

                win32gui.ShowWindow(handle, win32con.SW_MAXIMIZE)
                sleep(0.2)

                win32gui.BringWindowToTop(handle)
                sleep(0.2)

                win32gui.SetForegroundWindow(handle)
                sleep(0.2)

                win32gui.SetFocus(handle)
                sleep(0.2)
                print("\n Window hooked")
                sleep(1)

            except:

                print("\n", col.yel, "Expected error : ",
                    col.red, sys.exc_info(), col.res, "occurred")
                print("\n Program continuing")
                # when its up, focus the tab

        print("\n Connecting to server")
        connectToServer()  # runs the connect server function
        sleep(1)
        x = 1
        print("\n Anti afk kicker will start in 20 minutes . . .")
        for i in range(0,30):
            sleep(19.6)
            connectToServer()
        while x < 100:  # runs connect and anti afk 100 times

            connectToServer()

            sleep(1)

            antiAfk()

            sleep(1)

            x = x+1
