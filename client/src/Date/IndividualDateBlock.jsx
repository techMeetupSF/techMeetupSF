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
    if (event.showEvent) {
      return <MaterialCard key={idx} event={event} />
    }
    return '';
  });
};


export default ({events}) => {
  return (
    <div>
      <DateTitle dateStamp={events[0].dateStamp} />
      <div className='event_parent max_width'>
        <EventList events={events} className='max_width' />
      </div>
    </div>
  )
};
