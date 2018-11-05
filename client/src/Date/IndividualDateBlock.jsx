import React from 'react';
import './individual_date_block.css';
import MaterialCard from './MaterialCard';

const DateTitle = ({dateStamp}) => (
  <div className='date_header'>
    {dateStamp.toUpperCase()}
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
      <DateTitle dateStamp={events[0].dateStamp} />
      <div className='event_parent max_width'>
        <EventList events={events} className='max_width' />
      </div>
    </div>
  )
};
