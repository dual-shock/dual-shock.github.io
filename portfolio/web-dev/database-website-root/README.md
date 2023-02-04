
# Server database nettside

Nettsiden starter på HOME siden, det eneste meny-knappen du kan trykke er SERVERS hvor selve databasen ligger, eller logoen for å returnere til HOME.

På SERVERS siden fungerer ingen av header eller footer knappene (inkludert SEARCH) utenom HOME og logoen heller.

På venstre side av SERVERS siden er filteret for visningen av databasen, når man ticker av et SHOW ONLY felt vis siden bare vise servere med det attributtet satt til `true`.

SORT BY vil sortere databasen på det valgte attributtet. 

Databasen til nettsiden inneholder eksempler på servere fra spillet Rust, dokumentene jeg har inkludert for serverne forklares i server objekt eksemplet.

På SERVERS siden er det 2 forskjellige måter du kan se dataen fra databasen på, med en TABLE VIEW eller LIST VIEW.

Hvilket av disse som er "default" for siden, altså den måten dataen vises når siden loader, styres av variablen `listView`. Siden oppgaven sier at siden skal inneholde en tabell har jeg satt `listView = false` som gjør tabell visningen til "default" 


## Server objekt eksempel

I Firestor databasen er alle serverene lagret med like felt, slikt ser et server JSON objekt ut:
```
{
    data:{
        ip : "string.ip:12345",
        modded : true/false,
        status : true/false,
        uptime : 99
    },
    name : "server tittel",
    population : 999,
    rank : 999
}
```
`data` er et objekt inni server objektet for å kategorisere de ulike feltene

`ip` er en string av IPen til serveren

`modded` er en bool, om serveren er `modded:true` betyr det at serveren IKKE er offisiell, eller "official"
 
`status` er en bool som forteller om serveren er online eller ikke, `status:true` gjør at serveren anses som online

`uptime` er en integer mellom 0 og 100 som representerer prosentandelen serveren har vært online de siste 30 dagene

`name` er en string for navnet til serveren

`population` er en integer mellom 0 og 1000 som er lik antallet spillere som er koblet til serveren

`rank` er en integer mellom 0 og 1000 som er en rangering brukt for alle serverene, denne rangeringen er laget med en algoritme av Battlemetrics, hvor all dataen er tatt fra.

Firestore struktur:
![eksempel](https://i.imgur.com/0RswaWR.png)
## 'Table view'

Når visningen er satt til TABLE VIEW har siden en tabell inne i hovedfeeden av siden. 

Øverst til høyre i tabellen er det en knapp, LIST VIEW, som endred visningen til en liste. 

I tabellen er hver rad et server objekt, utenom tittel raden, info raden og 'add server' raden.

Tittel og info raden sier seg selv, 'add server' er en rad med inputs for alle server feltene utenom IDENTIFIER, fordi identifikasjonen blir generert av den unike ip-addressen til serveren. 

Spesifikasjoner for 'add server' inputene er i info raden. 

Hvis inputene satt inn i 'add server' raden ikke er valide vises det en feilmelding for det invalide inputet ved siden av | ADD SERVER knappen. 

Deretter er det en rad for hver server i databasen, likt med 'add server' raden har denne raden inputs for alle server feltene utenonm IDENTIFIER, men disse inputene styrer feltene til server objektene i databasen live, med en respons tid på under 200ms.

Det er også en | DELETE knapp ved siden av hver server som kan brukes til å slette en server live fra databasen. 

Før inputene blir sendt til databasen blir det sjekket om verdiene satt in er valide eller ikke, dette vises i form av ett rødt blink i feltet og at det verdien ikke endres videre. 

(Tabellen ser best ut i en skjerm med 16:9 ratio, men funker praktisk i alle laptop/pc skjermer)
## 'Table view'

Når visningen er satt til TABLE VIEW har siden en tabell inne i hovedfeeden av siden. 

Øverst til høyre i tabellen er det en knapp, LIST VIEW, som endred visningen til en liste. 

I tabellen er hver rad et server objekt, utenom tittel raden, info raden og 'add server' raden.

Tittel og info raden sier seg selv, 'add server' er en rad med inputs for alle server feltene utenom IDENTIFIER, fordi identifikasjonen blir generert av den unike ip-addressen til serveren. 

Spesifikasjoner for 'add server' inputene er i info raden. 

Hvis inputene satt inn i 'add server' raden ikke er valide vises det en feilmelding for det invalide inputet ved siden av | ADD SERVER knappen. 

Deretter er det en rad for hver server i databasen, likt med 'add server' raden har denne raden inputs for alle server feltene utenonm IDENTIFIER, men disse inputene styrer feltene til server objektene i databasen live, med en respons tid på under 200ms.

Det er også en | DELETE knapp ved siden av hver server som kan brukes til å slette en server live fra databasen. 

Før inputene blir sendt til databasen blir det sjekket om verdiene satt in er valide eller ikke, dette vises i form av ett rødt blink i feltet og at det verdien ikke endres videre. 

(Tabellen ser best ut i en skjerm med 16:9 ratio, men funker praktisk i alle laptop/pc skjermer)
## 'List view'

LIST VIEW er mer primitiv enn tabell visningen, og støtter ikke live endring for hvert felt i serverene. 

I likhet med TABLE VIEW er den øverste serveren i listen et input for å legge til servere i databasen, her vil det også komme en feilmelding ved siden av | ADD SERVER knappen om inputtene er invalide. 

Det er også | DELETE knapper for hver server i LIST VIEW visningen.

SORT BY og SHOW ONLY knappene fungerer likt på LIST VIEW visningen som på TABLE VIEW visningen. 

LIST VIEW visningen er mer for å ha en estetisk visning av dataen og muligens søking, mens TABLE VIEW visningen er mer for en funksjonell måte å endre dataen. 