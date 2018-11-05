import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class MaterialCard extends Component {
  constructor(...props) {
    super(props);
  }
  render() {
    const event = this.props.event;
    const organizer = event.group.name;
    const eventName = event.name;
    const description = organizer + " hosts " + eventName + ".";

    const rsvpCount = event.yes_rsvp_count;
    const memberName = event.group.who;
    const numberGoing = rsvpCount + " " + memberName + " going.";

    const venue = event.venue || '';
    const hostCompany =  venue.name || 'Unknown Host';
    const timeStamp = event.timeStamp;
    const hostPlusTime = hostCompany + " @ " + timeStamp;
    return (
      <Card className={styles.card}>
           <CardActionArea>
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                 {hostPlusTime}
               </Typography>
               <Typography component="p">
                 {description}
               </Typography>
               <Typography component="p">
                 {numberGoing}
               </Typography>
             </CardContent>
           </CardActionArea>
         </Card>
    );
  }
}

export default MaterialCard;
