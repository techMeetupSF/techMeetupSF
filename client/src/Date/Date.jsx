import React from 'react'
import './Date.css'

import IndividualDateBlock from './IndividualDateBlock';

export default ({eventsByDate}) => {

  const MMDD = Object.keys(eventsByDate);
  eventsByDate = eventsByDate || [];
  return (
    <div>
      {
        MMDD.map((singleMMDD, idx) => {
          return <IndividualDateBlock key={idx} events={eventsByDate[singleMMDD]} />
        })
      }
    </div>
  );
};
