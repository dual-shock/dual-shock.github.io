# prj-trafikksystem-simulator
Detter er et system som simulerer og tracker data fra et registreringspunkt langs en vei.
Koden er skrevet på engelsk for bedre forståelse og terminologi for utrykk som
det ikke finnes bra deskriptorer for på norsk. 


Hvordan man kjører: 

    Last ned og pakk ut trafikksystem.zip folderen, husk hvor du pakker den ut. 

    Du kan enten:
        Simpelthen klikke på main.py filen, og windows vil kjøre den i CMD
        
    eller:
        Kjør main.py ved å bruke din egen editor (spyder, vsc, etc. )
        
    eller:
        åpne ett cmd vindu (kommandolinje) og kjør følgende kommandoer:

            cd C:\Vei\Til\prj-trafikksystem

            py main.py


    Da vil programmet starte og videre instruksjoner vil printes ut i konsollen din. 

    OM MAN ØNSKER kan man endre parameterene for hvor lang simulasjonen skal være og
    hvor mange biler som skal simuleres. Man kan også endre antallet biler som registeret
    skal fylles med.



Forklaring av systemet:

    main.py er hovedskriptet i systemet, når du kjører skripter får du prompter for om du vil
    se hjelp for resten av filene i systemet og deres klasser, og du blir promptet om du vil
    kjøre skriptet som fyller registeret og skriptet som simulerer passeringene til bilene. 

    Å fylle registeret og å kjøre simuleringen er valgfritt, siden denne dataen er allerede
    generert og main.py fungerer uten å generere dem på nytt, men om du ønsker kan du kjøre
    begge for å sjekke at det funker og for å få nye dater å teste på.

    fillregister.py fyller .json registeret med (by default) 100'000 bil objekter med
    tilfeldige
    realistiske navn, tilfeldige realistiske bilskilt, og tildeldige ekte bilmoddeller. 

    simulator.py bruker registeret og simulerer (by default) ett år med passeringer av bilene
    fra registeret, (by default) blir det cirka 400'000 passeringer, mellom 20 og 110
    passeringer per time, med parametere som simulerer realistisk rush tid mellom 
    kl 7 og 9 og mellom kl 15 og 17. Dataen fra passeringene samles i en .json fil (data.json)

    main.py bruker dataen fra data.json fra simulatoren og finner dagen(e) med flest
    passeringer
    og de respektive timene på de dagene med flest passeringer

    Man kan kjøre fillregister.py og simulator.py på egen hånd eller via main.py som en
    import.

    Om man vil, kan man manuelt gå inn i register.json og data.json, og se dataene som blir 
    lagt til når skriptene blir kjørt for å få en forståelse av datastrukturen. 



Noter:

    Grunnen til at jeg bruker .txt filer med Json objekter er for å best vise måten dataen
    lagres på. Å bruke .txt eller .json er en ganske ineffektiv måte å behandle data i python
    med, og det hadde kjørt mye raskere og effektiv med f.eks serialiserte python .pickle 
    filer som behandler data og python objekter mye mer effektv, MEN jeg ville at man skal
    kunne se måten dataen lagres i et "human readable" format, som man kan gå å se i 
    register.txt og data.txt