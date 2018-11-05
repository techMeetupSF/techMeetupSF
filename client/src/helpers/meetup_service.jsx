const dayofWeek = (dateStamp) => {
  return dateStamp.toLocaleDateString([], {weekday: 'long'}).toUpperCase();
}

const createMMDD = (dateStamp) => {
  return dateStamp.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
}

const createTime = (dateStamp) => {
  return dateStamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export const parseTimeIntoDate = (milliseconds) => {
  const date = new Date(milliseconds);
  return {
    dayofWeek: dayofWeek(date),
    MMDD: createMMDD(date),
    timeStamp: createTime(date),
  };
}
