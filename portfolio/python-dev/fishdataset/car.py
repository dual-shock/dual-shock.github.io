#%%
from pylab import *

car = loadtxt("car.csv", 
delimiter=";",
skiprows = 1, 
usecols = (0,1))
day =  car[:,0]
num = car[:,1]

plot(day,num)
grid()
xlabel("DAY")
ylabel("NUM")