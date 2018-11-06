import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { API } from '../env';
import FoodChip from './FoodChip/FoodChip';

import './material_card.css';

class MaterialCard extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = () =>{
  //   axios.get(`https://api.meetup.com/2/groups?key=${API}&photo-host=public&group_id=4431242&only=organizer.photo.photo_link`)
  //     .then(response =>{
  //       const group_photo_url = response.data.results.organizer.photo.photo_link
  //       this.setState({
  //         eventsByDate: parseResults(response)
  //       })
  //     })
  // }

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
    return (
      <a href={event.event_url} className='not_link padded'>
        <Card className='material_card'>
           <CardActionArea className='material_height'>
             <CardContent>
               <Typography component="h5" className="group_name">
                {organizer.toUpperCase()}
               </Typography>
               <Typography gutterBottom variant="h5" component="h2">
                 {eventName}
               </Typography>
               <Typography component="h5" className="sub_details">
                {hostCompany}
               </Typography>
               <Typography component="p">
                 {numberGoing}
               </Typography>
             </CardContent>
             <div className="food_chips">
               <FoodChip />
               <FoodChip />
             </div>
           </CardActionArea>
         </Card>
       </a>
    );
  }
}

export default MaterialCard;
