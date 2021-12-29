# E-knjižni nomad - interaktivni zemljevid

Projekt je del projekta E-knjižni nomad, ki se ga gradi v sklopu predmeta interaktivnost in oblikovanje informacij na Fakulteti za računalništvo in informatiko.

Interaktiven zemljevid omogoča virtualni obisk različnih lokacij v Ljubljani s klikom na le-te. Administratorjem je omogočeno dodajanje novih lokacij, le-te pa lahko tudi premikajo, urejajo in odstranjujejo. Uporabnikom je dovoljen pregled nad lokacijami. Aplikacija je prilagojena za prikaz na mobilnih napravah.

## Navodila za dodajanje lokacij

Predpogoj: v mapo _data_ dodajte mapo pesmi-lokacije z vsemi potrebnimi podatki.

Po ustvarjanju in spreminjanju lokacij se prenese json datoteka. To s klikom na kombinacijo tipk *Shift + Alt + F* f Visual Studio Code formatiramo in uredimo podatke ter dodamo informacije, nato pa trenutno datoteko _locations.json_ zamenjamo z novo.

## Uporabljena orodja in tehnologije

* HTML, CSS, JS
* Three.js (izris)
* OpenStreetMap (mapa)
* Blender, blender-osm, Mapbox (model Ljubljane)
* Google Fonts: ikone

### Različica 0.1.3