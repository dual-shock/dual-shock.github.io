#%%
import statsmodels.api as sm
from pylab import *

cur_dir = __file__.rpartition('\\')[0]
filename = '\\Inflasjon.csv'
inflasjon = loadtxt(cur_dir + filename, delimiter=";",skiprows = 1, usecols = (1,2))

infl_år = inflasjon[:,0]

infl_prosenter = inflasjon[:,1]


grunnverdi = 1

valuta_økning = []

for i in range(len(infl_år)):
   print(f"verdi før økning: {round(grunnverdi,2)}")

   grunnverdi += grunnverdi * infl_prosenter[i] / 100
   print(f"prosent økning: {infl_prosenter[i]}%")
   print(f"verdi etter økning: {round(grunnverdi,2)}")
  
   valuta_økning.append(grunnverdi)
   print(" ")

figure() #lager ny figur (graf)
plot(infl_år, valuta_økning, c="red")

grid()

xlabel("År")

ylabel("valuta økning")


nedre = loadtxt("nedre.csv", delimiter=";",skiprows = 1, usecols = (1,2))

nedre_år =  nedre[:,0]

nedre_tall = nedre[:,1]

figure() #lager ny figur (graf)
plot(nedre_år, nedre_tall, c="blue")

grid()

xlabel("År")

ylabel("Verdi i euro")


dyrest = loadtxt("dyrest.csv", delimiter=";",skiprows = 1, usecols = (1,2))

dyreste_år =  dyrest[:,0]

dyrest_tall = dyrest[:,1]

figure() #lager ny figur (graf)
plot(dyreste_år, dyrest_tall, c="orange")

grid()

xlabel("År")

ylabel("Verdi i euro")


# %%
