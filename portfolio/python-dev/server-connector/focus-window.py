import win32gui
import time
import sys
import win32con
import win32process as wproc
import win32api as wapi

varProgramToFind = "Rust"
  
def window_enum_handler(hwnd, resultList):
    if win32gui.IsWindowVisible(hwnd) and win32gui.GetWindowText(hwnd) != '':
        resultList.append((hwnd, win32gui.GetWindowText(hwnd)))

def get_app_list(handles=[]):
    mlst=[]
    win32gui.EnumWindows(window_enum_handler, handles)
    for handle in handles:
        mlst.append(handle)
    return mlst

appwindows = get_app_list()

numberOfPrograms = len(appwindows)

for x in range(0,numberOfPrograms):

    if varProgramToFind == (str(appwindows[x]).split("'"))[1]:
        print("program nr.",x,"\tMatch\t\t",(str(appwindows[x]).split("'"))[1])
        correctProgram = (str(appwindows[x]).split("'"))[1]
    else:
        print("program nr.",x,"\tNo match\t",(str(appwindows[x]).split("'"))[1])
#CMD TEST (???)
print(correctProgram)
handle = win32gui.FindWindow(None, correctProgram)  
if x==x:

    print("1does it focus test", str(handle), correctProgram)
    win32gui.BringWindowToTop(handle)
    time.sleep(0.5)
    print("2does it focus test", str(handle), correctProgram)  
    win32gui.SetForegroundWindow(handle)
    time.sleep(0.5)

    win32gui.SetActiveWindow(handle)





    remote_thread, _ = wproc.GetWindowThreadProcessId(handle)
    wproc.AttachThreadInput(wapi.GetCurrentThreadId(), remote_thread, True)

    print("3does it focus test", str(handle), correctProgram)

    win32gui.SetFocus(handle)
    time.sleep(0.5)
    print("4does it focus test", str(handle), correctProgram)
    win32gui.ShowWindow(handle, win32con.SW_MAXIMIZE)
    time.sleep(0.5)
    print("5does it focus test", str(handle), correctProgram)
    win32gui.BringWindowToTop(handle)
    time.sleep(0.5)
    print("6does it focus test", str(handle), correctProgram)  
    win32gui.SetForegroundWindow(handle)
    time.sleep(0.5)
    print("7does it focus test", str(handle), correctProgram)
    win32gui.SetFocus(handle)
    time.sleep(0.5)
    print("8does it focus test", str(handle), correctProgram)


print("program continuing")





