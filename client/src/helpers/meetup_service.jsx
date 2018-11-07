 export const doeshaveDinner = (event) => {
   const cateredDinner = false;
   // Github
   // google
   // fog city ruby
   // Uber
   // SFNode.
   // Not Just pizza
   // Not pizza
   return cateredDinner;
 }

 const FOOD_ITEMS = [
   'food',
   'noms',
   'pizza',
   'snacks',
   'drinks',,
   'dinner',
   'booz',
   'beverages',
   'not just pizza',
 ];

export const doeshaveFood = (event) => {
  for (const food of FOOD_ITEMS) {
    if (event.description.includes(food)) {
       return true;
    }
  }
  return false;
};

export const doeshavePizza = (event) => {
   return event.description.includes("pizza");

};
 export const doeshaveDrinks = (event) => {
    return event.description.includes("drink");
};

export const doeshaveThirtyRsvp = (event) => {
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

export const parseTimeIntoDate = (milliseconds) => {
  const date = new Date(milliseconds);
  return {
    dayofWeek: dayofWeek(date),
    MMDD: createMMDD(date),
    timeStamp: createTime(date),
    dateStamp: createLongFormDate(date),
  };
};
