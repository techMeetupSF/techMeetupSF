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

<<<<<<< HEAD
import { parseResults } from './helpers/meetup_service';
import { showWhichEvents } from './helpers/filter_service';
import { NUM_EVENTS, NUM_EVENTS_SECOND } from './helpers/constants';
=======
import { parseTimeIntoDate, doeshaveDinner, doeshaveFood, doeshavePizza, doeshaveDrinks, doeshaveThirtyRsvp } from './helpers/meetup_service';
import { showWhichEvents } from './helpers/filter_service';
>>>>>>> f55b063... Filter bar is working


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
        eventsByDate: {},
        showThirtyPlus: 1,
        showFood: 0,
    };

    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleRsvpSwitch = this.handleRsvpSwitch.bind(this);
  }

<<<<<<< HEAD
=======
  handleFoodChange(e, showFood) {
    e.preventDefault();
    let eventsByDate = this.state.eventsByDate;
    eventsByDate = showWhichEvents(eventsByDate, this.state.showThirtyPlus, showFood);

    this.setState({
      showFood,
      eventsByDate,
    });
  };

  handleRsvpSwitch(e, showThirtyPlus) {
    e.preventDefault();
    let eventsByDate = this.state.eventsByDate;
    eventsByDate = showWhichEvents(eventsByDate, showThirtyPlus, this.state.showFood);

    this.setState({
      showThirtyPlus,
      eventsByDate,
    });
  };


>>>>>>> f55b063... Filter bar is working
  componentDidMount = () => {
    const firstFetch = `https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=${NUM_EVENTS}&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`
    const secondFetch = `https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=${NUM_EVENTS_SECOND}&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`

    axios.get(firstFetch)
      .then(response => {
        const eventsFromWire = response.data.results;
        const events = parseResults(eventsFromWire);

        this.setState({
          eventsByDate: events,
        });
      })
    axios.get(secondFetch)
      .then(responseTwo => {
        let eventsFromWire = responseTwo.data.results;
        // eventsFromWire.splice(0, NUM_EVENTS);
        const events = parseResults(eventsFromWire);

        this.setState({
          eventsByDate: events,
        });
      })
  }

  handleFoodChange(e, showFood) {
    e.preventDefault();
    let eventsByDate = this.state.eventsByDate;
    eventsByDate = showWhichEvents(eventsByDate, this.state.showThirtyPlus, showFood);

    this.setState({
      showFood,
      eventsByDate,
    });
  };

  handleRsvpSwitch(e, showThirtyPlus) {
    e.preventDefault();
    let eventsByDate = this.state.eventsByDate;
    eventsByDate = showWhichEvents(eventsByDate, showThirtyPlus, this.state.showFood);

    this.setState({
      showThirtyPlus,
      eventsByDate,
    });
  };

  render() {
    return (
      <div className="sf_tech">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <MobileIntro />
          <IntroBar/>
          <FilterBar
            showFood={this.state.showFood}
            showThirtyPlus={this.state.showThirtyPlus}
            handleRsvpSwitch={this.handleRsvpSwitch}
            handleFoodChange={this.handleFoodChange}
            />
          <Date eventsByDate={this.state.eventsByDate}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
