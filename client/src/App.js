import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { API } from './env';
import Date from './Date/Date';
import IntroBar from './IntroBar/IntroBar';
import MobileIntro from './IntroBar/MobileIntro';
import FilterBar from './FilterBar/FilterBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { parseTimeIntoDate, doeshaveDinner, doeshaveFood, doeshavePizza, doeshaveDrinks, doeshaveThirtyRsvp } from './helpers/meetup_service';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#80deea',
    },
    drinks: '#80deea'
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        eventsByDate: [],
    };

    this.handleRsvpSwitch = this.handleRsvpSwitch.bind(this);
  }

  handleRsvpSwitch(e, value) {
    e.preventDefault();
    console.log(e, value);
    // this.setState({
    //   someVar: someValue
    // })
  }


  componentDidMount = () => {
    axios.get(`https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=20&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`, { crossdomain: true })
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

            e.description = e.description.toLowerCase();
            e.hasCateredDinner = doeshaveDinner(e);
            e.hasFood = doeshaveFood(e);
            e.hasPizza = doeshavePizza(e);
            e.hasDrinks = doeshaveDrinks(e);
            e.hasThirtyRsvp = doeshaveThirtyRsvp(e);
            e.showEvent = e.hasThirtyRsvp;

            eventsByTime[MMDD].push(e);
          }
          return eventsByTime;
        }

        const events = parseResults(response);


        this.setState({
          eventsByDate: events,
        })
      })
  }

  render() {
    return (
      <div className="sf_tech">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <MobileIntro />
          <IntroBar/>
          <FilterBar handleRsvpSwitch={this.handleRsvpSwitch}/>
          <Date eventsByDate={this.state.eventsByDate}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
