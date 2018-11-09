 const doeshaveDinner = (event) => {
   const venue = event.venue || {name: ''};
   const venueName = venue.name.toLowerCase();
   if (venueName.includes('google')) return true;
   if (venueName.includes('uber')) return true;
   if (venueName.includes('github')) return true;

   const organizer = event.group.name.toLowerCase();
   if (organizer.includes('fog city')) return true;
   if (organizer.includes('sfnode')) return true;

   if (event.description.includes('not just pizza')) return true;
   if (event.description.includes('not pizza')) return true;

   return false;
 }

const FOOD_ITEMS = [
   'food',
   'not pizza',
   'dinner',
   'not just pizza',
 ];

const doeshaveFood = (event) => {
  for (const food of FOOD_ITEMS) {
    if (event.description.includes(food)) {
       return true;
    }
  }
  return false;
};

const doeshavePizza = (event) => {
   return event.description.includes("pizza");

};
const doeshaveDrinks = (event) => {
    return event.description.includes("drink");
};

const doeshaveThirtyRsvp = (event) => {
  return event.yes_rsvp_count > 30;
};

const dayofWeek = (dateStamp) => {
  return dateStamp.toLocaleDateString([], {weekday: 'long'}).toUpperCase();
};

const createMMDD = (dateStamp) => {
  return dateStamp.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
};

const createTime = (dateStamp) => {
  return dateStamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
};

const createLongFormDate = (dateStamp) => {
  return dateStamp.toLocaleDateString([], {weekday: 'long', month: 'long', day: '2-digit'});
};

const parseTimeIntoDate = (milliseconds) => {
  const date = new Date(milliseconds);
  return {
    dayofWeek: dayofWeek(date),
    MMDD: createMMDD(date),
    timeStamp: createTime(date),
    dateStamp: createLongFormDate(date),
  };
};

export const parseResults = (events) => {
  const eventsByTime = {};
  for (const e of events) {
    const { MMDD, dayofWeek, timeStamp, dateStamp } = parseTimeIntoDate(e.time);
    e.dayofWeek = dayofWeek;
    e.timeStamp = timeStamp;
    e.dateStamp = dateStamp;
    eventsByTime[MMDD] = eventsByTime[MMDD] || [];

    if (!e.description) e.description = ".";
    e.description = e.description.toLowerCase();
    e.hasCateredDinner = doeshaveDinner(e);
    e.hasFood = doeshaveFood(e);
    e.hasPizza = doeshavePizza(e);
    e.hasDrinks = doeshaveDrinks(e);
    e.hasThirtyRsvp = doeshaveThirtyRsvp(e);
    e.showEvent = e.hasThirtyRsvp;

    eventsByTime[MMDD].push(e);
  }
  return eventsByTime;
}
