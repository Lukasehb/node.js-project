# Node.js Data Driven API

Dit project is een RESTful API gebouwd met **Node.js** en **Express**. Het maakt gebruik van een **SQLite** database om data op te slaan en biedt volledige CRUD-functionaliteit (Create, Read, Update, Delete) voor gebruikers en nieuwsberichten.

##  Installatie & Starten

Volg onderstaande stappen om het project lokaal werkend te krijgen:

1.  **Project downloaden**
    Zorg dat de projectbestanden op je computer staan.

2.  **Dependencies installeren**
    Open je terminal in de projectmap en voer het volgende commando uit om alle benodigde libraries (zoals Express en SQLite3) te installeren:
    ```bash
    npm install
    ```

3.  **Applicatie starten**
    Start de server met:
    ```bash
    node index.js
    ```

4.  **Testen**
    Open je browser en ga naar `http://localhost:3000`. Je ziet hier een documentatiepagina met een overzicht van alle endpoints.

##  Functionaliteiten

De API voldoet aan de volgende eisen:

* **Database Koppeling**: Gebruikt `sqlite3` voor dataopslag (bestand: `database.sqlite`).
* **Endpoints**:
    * `/users`: Beheer van gebruikers.
    * `/newsposts`: Beheer van nieuwsberichten.
* **Features**:
    * **CRUD**: Toevoegen, lezen, updaten en verwijderen van data.
    * **Validatie**: Checkt op lege velden, datatypes (bijv. leeftijd moet een getal zijn) en logica (bijv. geen cijfers in een voornaam).
    * **Zoeken**: Filter resultaten via de `?search=...` parameter.
    * **Paginatie**: Beperk resultaten via `?limit=10&offset=0`.

##  Bronvermeldingen

Dit project is tot stand gekomen met behulp van de volgende bronnen:

* **Node.js Documentatie**: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
* **Express.js Guide**: [https://expressjs.com/](https://expressjs.com/)
* **SQLite3 Package**: [https://www.npmjs.com/package/sqlite3](https://www.npmjs.com/package/sqlite3)
* *Cursusmateriaal Backend Development*
* *https://gemini.google.com/share/6782dabadd19

##  Overige Informatie

* **Database**: De database tabellen (`gebruikers` en `newsposts`) worden automatisch aangemaakt bij het starten van de applicatie als deze nog niet bestaan.
* **Error Handling**: De API geeft duidelijke foutmeldingen terug (bijv. status `400` bij validatiefouten of `404` als een item niet gevonden is).
