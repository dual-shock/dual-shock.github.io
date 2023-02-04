#%% 
from pylab import *
import statsmodels.api as sm

def avrg(axis, ydata, xdata, size=2,line="dashed", col="black"):
    k = size
    glatt = []
    for i in range(k,len(xdata)-k):
        glatt.append(mean(xdata[(i-k):(i+k)]))
    axis.plot(ydata[k:len(xdata)-k], glatt, linestyle=line,color=col)
def rgba(r,g,b,a=1):return (r/255,g/255,b/255,a)
rgb = rgba


yrke = loadtxt("fisker-yrke.csv", delimiter=";",skiprows = 1, usecols = range(0,4))


yrke_aar = yrke[:,0]
hovedyrke = yrke[:,1]
sideyrke = yrke[:,2]
totalyrke = yrke[:,3]


fig1, (ax1, ax2) = subplots(1,2, sharey=True, constrained_layout=True)

ax1.grid()
ax1.plot(yrke_aar, hovedyrke, color=rgb(255, 0, 255))
avrg(ax1, yrke_aar, hovedyrke)


ax1.plot(yrke_aar, sideyrke, color=rgb(255, 98, 0))
avrg(ax1, yrke_aar, sideyrke)


ax1.set_ylabel("Yrkesfiskere")
ax1.set_xlabel("År")
#ax1.axvline(x=1969,ymin=0.06, ymax=0.5, color="k",linewidth=2)
ax1.set_title("Hoved (rød) og sideyrke (blå)")

fig1.suptitle("Antall yrkesfiskere i norge fra 1924-2019")


ax2.grid()
ax2.plot(yrke_aar, totalyrke, color="red")
avrg(ax2, yrke_aar, totalyrke)


#ax2.axvline(x=1969,ymin=0.2, ymax=0.6, color="k",linewidth=2)
ax2.set_title("Total")
ax2.set_xlabel("År")




fig2, (ax1, ax2) = subplots(1,2,constrained_layout=True )


torsk_tot = loadtxt("torsk-fartøyfylke-tot.csv", 
delimiter=";",
skiprows = 1, 
usecols = (2,4))


tot_aar = torsk_tot[:-2,0]
tot_torsk = torsk_tot[:-2,1]

ax1.set_ylim(50000,800000)
ax1.grid()
ax1.plot(tot_aar,tot_torsk)



torsk_fi = loadtxt("torsk-fartøyfylke-fi.csv", 
delimiter=";",
skiprows = 1, 
usecols = (2,4))


fi_aar = torsk_fi[:-2,0]
fi_torsk = torsk_fi[:-2,1]


ax2.set_ylim(50000,230000)
ax2.grid()
ax2.plot(fi_aar, fi_torsk,c="red")


torsk_sf = loadtxt("torsk-fartøyfylke-sf.csv", 
delimiter=";",
skiprows = 1, 
usecols = (2,4))


sf_aar = torsk_sf[:-2,0]
sf_torsk = torsk_sf[:-2,1]


ax2.set_ylim(50000,230000)
#ax2.grid()
ax2.plot(sf_aar, sf_torsk, c="blue")


torsk_mr = loadtxt("torsk-fartøyfylke-mr.csv", 
delimiter=";",
skiprows = 1, 
usecols = (2,4))


mr_aar = torsk_mr[:-2,0]
mr_torsk = torsk_mr[:-2,1]


ax2.set_ylim(50000,230000)
#ax2.grid()
ax2.plot(mr_aar, mr_torsk, c="black")

#%%
from pylab import *
import statsmodels.api as sm
data = loadtxt("fartøyfylke_og_art_data.csv", 
    delimiter=";",
    skiprows = 1, 
    usecols = (1,2)
)

fylker = [
    "Finnmark",
    "Troms",
    "Nordland",
    "Trøndelag",
    "Trøndelag",
    "Romsdal",
    "Fjordane",
    "Hordaland",
    "Rogaland",
    "Agder",
    "Agder",
    "Telemark",
    "Vestfold",
    "Oslo",
    "Buskerud",
    "Akershus",
    "Østfold",
    "Uoppgitt"
]


index = 0
for i in range(len(fylker)):
    #print(data[index:index+20,1])
    plot(data[index:index+20,0],data[index:index+20,1])
    index += 20
ylim(0,25000)
#print(data[0:20,0])

