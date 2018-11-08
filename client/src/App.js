import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Date from './Date/Date';
import IntroBar from './IntroBar/IntroBar';
import MobileIntro from './IntroBar/MobileIntro';
import FilterBar from './FilterBar/FilterBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { parseResults } from './helpers/meetup_service';
import { showWhichEvents } from './helpers/filter_service';


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

  componentDidMount = () => {
    axios.get('/api/twentyEvents')
      .then(response => {
        const eventsFromWire = response.data.results;
        const events = parseResults(eventsFromWire);

        this.setState({
          eventsByDate: events,
        });
      })
    axios.get('/api/twoHundredEvents')
      .then(responseTwo => {
        let eventsFromWire = responseTwo.data.results;
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
