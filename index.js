//console.log(setCalendar("2022-03-10T15:00:00","2022-05-15T15:00:00","daily",6,"2022-04-21T15:00:00","2022-08-20T15:00:00"));
// Function d'appels //
function setCalendar(startDate,endDate,frequency,interval,newEndDate=null,exceptionDate=null){


    var firstOccurrences = getOccurrences(startDate, endDate, setRecurrenceRule(frequency, interval), addExceptionDate(exceptionDate));

    var anotherOccurrence = nextOccurrence(getOccurrences(startDate, endDate, setRecurrenceRule(frequency, interval)), newEndDate, setRecurrenceRule(frequency, interval), addExceptionDate(exceptionDate));

    var groupOccurence = [];
    for(var i = 0;i<firstOccurrences.length;i++){
        groupOccurence.push(firstOccurrences[i]);
    }
    for(var i = 0;i<anotherOccurrence.length;i++){
        groupOccurence.push(anotherOccurrence[i]);
    }

    var results = [];
    for(var i = 0;i<groupOccurence.length;i++){
        results.push(
            {
                "id": i,
                "hours": groupOccurence[i].getHours()+"h",
                "jours": groupOccurence[i].getDay(),
                "mounth": groupOccurence[i].getMonth(),
                "years": groupOccurence[i].getFullYear(),
                "UTC": (groupOccurence[i].getTimezoneOffset()/60)
            }
        )
    }
    return results;
        
}

// Gestion des Règles de Récurrence //
function setRecurrenceRule(frequency, interval){
    if(frequency == "daily" || frequency == "weekly" || frequency == "monthly" || frequency == "yearly"){
        if(Number.isInteger(interval)){
            var RecurrenceRule = {};
            return RecurrenceRule = {
                "frequency": frequency,
                "interval": interval
            }
        }
    }
}

// function getRecurrenceRule(frequency, interval){
//     return this.setRecurrenceRule(frequency, interval);
// }

// Calcul des Occurrences //
function getOccurrences(startDate, endDate, recurrenceRule, exceptionDate){
    var startingDate = new Date(startDate);
    var endingDate = new Date(endDate);
    var dateExecption = new Date(exceptionDate);
    var jours = [];
    
    while(startingDate <= endingDate){
            if(recurrenceRule.frequency == "daily"){
                startingDate.setDate(startingDate.getDate() +recurrenceRule.interval);
            }
            if(recurrenceRule.frequency == "weekly"){
                startingDate.setDate(startingDate.getDate() +(recurrenceRule.interval*7));
            }
            if(recurrenceRule.frequency == "monthly"){
                startingDate.setMonth(startingDate.getMonth() +recurrenceRule.interval);
            }
            if(recurrenceRule.frequency == "yearly"){
                startingDate.setFullYear(startingDate.getFullYear() +(recurrenceRule.interval));
            }
            if(startingDate.getTime() != dateExecption.getTime()){jours.push(new Date(startingDate));}         
    }
    return jours;
}

function nextOccurrence(oldOccurance ,afterDate, recurrenceRule, exceptionDate){

    var startingDate = oldOccurance;
    startingDate = startingDate.at(-1);
    var endingDate = new Date(afterDate);
    var dateExecption = new Date(exceptionDate);
    var jours = [];

    while(startingDate <= endingDate){
        if(recurrenceRule.frequency == "daily"){
            startingDate.setDate(startingDate.getDate() +recurrenceRule.interval);
        }
        if(recurrenceRule.frequency == "weekly"){
            startingDate.setDate(startingDate.getDate() +(recurrenceRule.interval*7));
        }
        if(recurrenceRule.frequency == "monthly"){
            startingDate.setDate(startingDate.getDate() +(recurrenceRule.interval*30));
        }
        if(recurrenceRule.frequency == "yearly"){
            startingDate.setDate(startingDate.getDate() +(recurrenceRule.interval*364));
        }
        if(startingDate.getTime() != dateExecption.getTime()){jours.push(new Date(startingDate));}
    }
    return jours;   
}

// Gestion des Exceptions et Modifications //
function addExceptionDate(date){
   var exceptionDate = new Date(date);
   return exceptionDate;
}

module.exports = { setCalendar }

// function modifyOccurrence(newStartDate, newEndDate, recurrenceRule){
//    return this.getOccurrences(newStartDate, newEndDate, recurrenceRule);
// }