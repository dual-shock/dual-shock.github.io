# import modules
from tkinter import *

# configure workspace
ws = Tk()
ws.title("First Program")
ws.geometry('250x150')
ws.configure(bg="#567")

timeLB = Label(ws, text="What time is wipe for your server? ", padx=10, pady=15, bg="#567")
colon = Label(ws, text=":", bg="#567")

items = StringVar()
items.set("00")

hours = OptionMenu(ws,items, "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24")

items2 = StringVar()
items2.set("00")

mins = OptionMenu(ws,items2, "00","05","10","15","20","25","30","35","40","45","50","55")


timeLB.grid(row=0, columnspan =3)
hours.grid(row=1, column =0)
colon.grid(row=1, column=1)
mins.grid(row=1, column =2)
# infinite loop 
ws.mainloop()

print(items, items2, hours, mins)