#%%

from pylab import * 
import numpy as np
import statsmodels.api as sm
lowess = sm.nonparametric.lowess

nordsør = loadtxt("nordsoor.csv", delimiter=";", skiprows=1, usecols = range(0,3))

år = nordsør[:,0]
nord = nordsør[:,1]
sør = nordsør[:,2]


plot(år, nord)
plot(år, sør)

title("Total fisk i tonn - \nnord (blå) og sør (gul) for polarsirkelen")
grid()
xlabel("År")
ylabel("Fisk")

nordsørtorsk = loadtxt("nordsoortorsk.csv", encoding="utf-16", delimiter=";", skiprows=2, usecols = range(0,3))

år = nordsørtorsk[:,0]
nordtorsk = nordsørtorsk[:,1]
sørtorsk = nordsørtorsk[:,2]

fig1, (ax1, ax2) = subplots(1,2, constrained_layout=True)
fig1.suptitle('Antall torske fisk i tonn')

ax1.plot(år, nordtorsk, c="blue")
x = np.array(år[13:len(år)])
y = np.array(nordtorsk[13:len(nordtorsk)])
ax1.plot(x,y,'o')
m, b = np.polyfit(x,y,1)
ax1.plot(x, m*x + b, linewidth=3, c="orange")
ax1.set_title("Nord for polarsirkelen")
ax1.set_xlabel("År")
ax1.set_ylabel("Torske fisk i tonn")

ax2.plot(år, sørtorsk, c="blue")
x = np.array(år[10:len(år)])
y = np.array(sørtorsk[10:len(sørtorsk)])
ax2.plot(x,y,'o')
m, b = np.polyfit(x,y,1)
ax2.plot(x, m*x + b, linewidth=3, c="orange")
ax2.set_title("Sør for polarsirkelen")
ax2.set_xlabel("År")




fig2, axis = subplots(2,2, constrained_layout=True)
fig2.suptitle('Temperatur sør/nord for polarsirkelen - \n i utvalgte fylker')



nordtemp = loadtxt("temp-nord.csv", delimiter=";", skiprows=1, usecols=range(0,11))

årnord = nordtemp[:,0]
avrgnord = nordtemp[:,10]

for i in range(1,10):
    axis[0,0].plot(nordtemp[:,0], nordtemp[:,i])

axis[0,0].plot(årnord, avrgnord, linewidth=2, color="black")
axis[0,0].set_title("Nord for polarsirkelen")
axis[0,0].set_xlabel("År")
axis[0,0].set_ylabel("Temperatur (C)")
axis[0,0].set_ylim(-2,2)

sørtemp = loadtxt("temp-soor.csv", delimiter=";", skiprows=1, usecols=range(0,5))

årsør = sørtemp[:,0]
avrgsør = sørtemp[:,4]

for i in range(1,4):
    axis[0,1].plot(sørtemp[:,0], sørtemp[:,i])

axis[0,1].plot(årsør, avrgsør, linewidth=2, color="black")
axis[0,1].set_title("Sør for polarsirkelen")
axis[0,1].set_xlabel("År")

#k = 4
glatt = []
glatt_nord = lowess(avrgnord, årnord, frac = 0.5, return_sorted=False)

axis[1,0].plot(årnord, avrgnord, c="black")
axis[1,0].plot(årnord, glatt_nord, c="orange",linewidth=2)
axis[1,0].set_ylim(-2,2)



#k = 4
glatt = []
glatt_sør = lowess(avrgsør, årsør, frac = 0.5, return_sorted=False)


axis[1,1].plot(årsør, glatt_sør, c="orange", linewidth=2)
axis[1,1].plot(årsør, avrgsør, c="black")



for axis in fig2.get_axes():
      axis.label_outer()
# %%
