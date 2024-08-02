# recurrence-date

Recupère une liste de date avec une date de début et de fin plus une fréquence par jour/semaine/mois/année. il y à aussi la possibilité d'exclure certaine date ou de rajouté une date en plus pour etendre la liste

## Installation
```
# using npm
npm install recurrence-date

# using yarn
yarn add recurrence-date
```

## Usage
```
# using require
const { setCalendar } = require('recurrence-date');

# using import
import { setCalendar } from 'recurrence-date';
```

## Example
```
dateFormat = YYYY-MM-DD-THH-MM-SS;
dateExemple = 2022-03-10T15:00:00;

#setCalendar type
setCalendar(startDate,endDate,frequency,interval,newEndDate,exceptionDate)
# setCalendar exemple
setCalendar("2022-03-10T15:00:00","2022-05-15T15:00:00","daily",6,"2022-06-21T15:00:00")
```