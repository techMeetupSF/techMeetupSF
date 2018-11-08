const passesRsvpFilter = (event, thirtyPlus) => {
  if (event.hasThirtyRsvp && thirtyPlus) return true;
  if (!event.hasThirtyRsvp && !thirtyPlus) return true;
  return false;
}

const passesFoodFilter = (event, foodType) => {
  if (!foodType) return true;
  if (event.hasCateredDinner && foodType === 1) return true;

  const hasFood = (event.hasFood || event.hasPizza || event.hasCateredDinner);
  if (hasFood && foodType === 2) return true;
  return false;
}

const doesItPassFilter = (event, thirtyPlus, foodType) => {
  return (passesFoodFilter(event, foodType) && passesRsvpFilter(event, thirtyPlus));
}

export const showWhichEvents = (eventsByDate, thirtyPlus, foodType) => {
  const newShownEvents = {};
  const dates = Object.keys(eventsByDate);

  for (let MMDD of dates) {
    newShownEvents[MMDD] = [];
    for (let event of eventsByDate[MMDD]) {
      const showEvent = doesItPassFilter(event, thirtyPlus, foodType);
      event.showEvent = showEvent;
      newShownEvents[MMDD].push(event);
    }
}

  return newShownEvents;
};
