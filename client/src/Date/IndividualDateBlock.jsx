import React from 'react';
import './IndividualDateBlock.css';
import MaterialCard from './MaterialCard';

const DateTitle = ({mmdd, dayofWeek}) => (
  <div>
    {dayofWeek} {mmdd}
  </div>
);

const EventList = ({events}) => {
  return events.map((event, idx) => {
    return <MaterialCard key={idx} event={event} />
  });
};


export default ({events}) => {
  return (
    <div>
    {
      console.log(events[0])
    }
      <DateTitle mmdd={events[0].MMDD} dayofWeek={events[0].dayofWeek} />
      <EventList events={events} />
    </div>
  )
};
