import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import FoodChip from './FoodChip/FoodChip';
import MaterialCardText from './MaterialCardText/MaterialCardText';

import './material_card.css';

class MaterialCard extends Component {
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
    const numberGoing = rsvpCount + " " + memberName + " going at " + event.timeStamp;

    const venue = event.venue || '';
    const hostCompany =  venue.name || null;

    let foodType = null;
    let foodChipColor = 'primary';
    if (event.hasCateredDinner) {
      foodType = "CATERED DINNER";
      foodChipColor = 'secondary';
    } else if (event.hasPizza) {
      foodType = "PIZZA";
    } else if (event.hasFood) {
      foodType = "FOOD";
    }

    return (
      <a href={event.event_url} target="_blank" rel="noopener noreferrer" className='not_link padded'>
        <Card className='material_card'>
           <CardActionArea className='material_height'>
             <CardContent>
               <MaterialCardText text={organizer.toUpperCase()} styleName={'groupName'} />
               <MaterialCardText text={eventName} styleName={'bigText'} />
               <MaterialCardText text={hostCompany} styleName={'groupName'}/>
               <MaterialCardText text={numberGoing} styleName={'subDetails'}/>
             </CardContent>
             <div className="food_chips">
               {foodType && <FoodChip tag={foodType} color={foodChipColor} />}
               {event.hasDrinks && <FoodChip tag="DRINKS" color={foodChipColor} />}
             </div>
           </CardActionArea>
         </Card>
       </a>
    );
  }
}

export default MaterialCard;
