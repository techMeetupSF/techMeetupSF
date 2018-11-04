import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Date.css'

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class Date extends Component {

    render(){
        const eachDate = this.props.meetups.map((meetup, index) => {
          return (
            <IndividialDateBlock key={index} events={}
          )
        })
        // const meetupMapped = this.props.meetups.map((meetup, index)=>{
        //     return (<Card className={styles.card} key={index}>
        //                 <CardContent>
        //                     <Typography className={styles.title} color="textPrimary" gutterBottom>
        //                         {meetup.venue.name}
        //                     </Typography>
        //                     <Typography className={styles.title} color="textSecondary" gutterBottom>
        //                         {meetup.name}
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions>
        //                     <Button size="small">Learn More</Button>
        //                 </CardActions>
        //             </Card>)
        // })
        return(
          <div>
            this.props.each
          </div>
        );
    }
}

export default withStyles(styles)(Date);