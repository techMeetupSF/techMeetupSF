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

  // :
  // Datetime: "2018-11-27T02:00:00Z"
  // GroupName: "Microsoft HoloLens and Mixed Reality"
  // Name: "Mixed Reality Workgroup"
  // RsvpCount: 32
  // Tags: ["React"]
  // URL: "https://www.meetup.com/hololens-mr/events/256390437/"
  // Venue: {Name: "Microsoft Reactor"}


  render() {
    const event = this.props.event;
    const organizer = event.GroupName;
    const eventName = event.Name;

    const rsvpCount = event.RsvpCount;
    const memberName = '';
    const numberGoing = rsvpCount + " " + memberName + " going at " + event.timeStamp;

    const venue = event.Venue || '';
    const hostCompany =  venue.name || null;

    let foodType = null;
    let foodChipColor = 'secondary';
    if (event.hasCateredDinner) {
      foodType = "CATERED DINNER";
      foodChipColor = 'primary';
    } else if (event.hasPizza) {
      foodType = "PIZZA";
    } else if (event.hasFood) {
      foodType = "FOOD";
    }

    return (
      <a href={event.URL} target="_blank" rel="noopener noreferrer" className='not_link padded'>
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
