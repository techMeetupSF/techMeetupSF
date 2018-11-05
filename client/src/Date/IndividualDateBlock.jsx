import React from 'react';
import './individual_date_block.css';
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
      <div className='event_parent'>
        <EventList events={events} />
      </div>
    </div>
  )
};
