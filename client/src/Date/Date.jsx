import React from 'react'
import './Date.css'

import IndividualDateBlock from './IndividualDateBlock';

const showSingleEvent = (arr) => {
  return arr.some(el => {
    return el.showEvent;
  })
}

export default ({eventsByDate}) => {

  const MMDD = Object.keys(eventsByDate);
  const nonEmptyMMDDs = [];
  for (let singleMMDD of MMDD) {
    if (showSingleEvent(eventsByDate[singleMMDD])) {
      nonEmptyMMDDs.push(singleMMDD);
    }
  }

  eventsByDate = eventsByDate || [];
  return (
    <div>
      {
        nonEmptyMMDDs.map((singleMMDD, idx) => {
            return <IndividualDateBlock key={idx} events={eventsByDate[singleMMDD]} />
        })
      }
    </div>
  );
};
