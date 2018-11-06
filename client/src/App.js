import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { API } from './env';
import Date from './Date/Date';
import IntroBar from './IntroBar/IntroBar';
import FilterBar from './FilterBar/FilterBar';

import { parseTimeIntoDate } from './helpers/meetup_service';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        eventsByDate: [],
    };
  }

  componentDidMount = () =>{
    axios.get(`https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=30&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`)
      .then(response =>{

        const parseResults = (response) => {
          const events = response.data.results;
          const eventsByTime = {};
          for (const e of events) {
            const { MMDD, dayofWeek, timeStamp, dateStamp } = parseTimeIntoDate(e.time);
            e.dayofWeek = dayofWeek;
            e.timeStamp = timeStamp;
            e.dateStamp = dateStamp;
            eventsByTime[MMDD] = eventsByTime[MMDD] || [];
            eventsByTime[MMDD].push(e);
          }
          return eventsByTime;
        }


        this.setState({
          eventsByDate: parseResults(response)
        })
      })
  }

  render() {
    return (
      <div className="sf_tech">
        <IntroBar/>
        <FilterBar/>
        <Date eventsByDate={this.state.eventsByDate}/>
      </div>
    );
  }
}

export default App;
