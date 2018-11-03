import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {API} from './env'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        meetups: []
    }
  }

  componentDidMount = () =>{
    axios.get(`https://api.meetup.com/2/open_events?key=${API}&photo-host=public&category=34&status=upcoming&page=3&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group_topics`)
      .then(response =>{
        this.setState({
          meetups: response.data.results
        })
      })
  }

  render() {
    console.log(this.state.meetups)
    return (
      <div className="App">
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
