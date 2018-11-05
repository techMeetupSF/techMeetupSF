import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './material_card.css';

class MaterialCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const event = this.props.event;
    const organizer = event.group.name;
    const eventName = event.name;

    const rsvpCount = event.yes_rsvp_count;
    const memberName = event.group.who;
    const numberGoing = rsvpCount + " " + memberName + " going";

    const venue = event.venue || '';
    const hostCompany =  venue.name || null;
    const timeStamp = event.timeStamp;

    const hostAndVenue = (hostCompany ? hostCompany + " hosts " + organizer : organizer);

    const timeAndLocation = hostAndVenue + " at " + timeStamp;
    return (
      <a href={event.event_url} className='not_link padded'>
        <Card className='material_card'>
           <CardActionArea className='material_height'>
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                 {eventName}
               </Typography>
               <Typography component="p">
                 {timeAndLocation}
               </Typography>
               <Typography component="p">
                 {numberGoing}
               </Typography>
             </CardContent>
           </CardActionArea>
         </Card>
       </a>
    );
  }
}

export default MaterialCard;
