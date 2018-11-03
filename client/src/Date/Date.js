import React, { Component } from 'react'

class Date extends Component {

    render(){
        let meetupMapped = this.props.meetups.map((meetup, index)=>{
            return (<div key={index}>

                        <h1>{meetup.venue.name}</h1>

                    </div>)
        })
        return(
            <div>
                {meetupMapped}
            </div>
        );
    }
}

export default Date;