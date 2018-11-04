import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { API } from './env';
import Date from './Date/Date';
import IntroBar from './IntroBar/IntroBar';
import FilterBar from './FilterBar/FilterBar';

import parseTimeIntoDate from '../helpers';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        meetups: [],
    };
  }

  componentDidMount = () =>{
    axios.get(`https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=3&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group_topics`)
      .then(response =>{

        const parseResults = (response) => {
          const events = response.data.results;
          const eventsByTime = {};
          for (const e of events) {
            let MMDD = 
          }
          // each event has a time field in milliseconds.  It is called ... events[0].time?
          // This needs to be seperated into MMDD.
          // The new setState mechanism should have ...

          // ==>> React State <<===
          events: {
            MMDD: {
              {EVENT},{EVENT},{EVENT}
            },
            MMDD + 1: {
              {EVENT},{EVENT},{EVENT}
            }
          }
          //
        }

        this.setState({
          meetups: response.data.results
        })
      })
  }

  render() {
    return (
      <div>
        <IntroBar/>
        <FilterBar/>
        <Date meetups={this.state.meetups}/>
      </div>
    );
  }
}

export default App;
