import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  inner: {
    flexDirection: 'row',
  }
});

class FilterBar extends React.Component {
  state = {
    value: 0,
  };

  handleFoodChange = (event, value) => {
    // this.setState({ value });
  };


  handleFoodChange = (event, value) => {
    // this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.inner}>
          <div className="logo"> Tech Meetup SF </div>
          <Tabs value={value} onChange={this.handleRsvpChange}>
            <Tab label="Show 0-30 RSVPs" />
            <Tab label="Show Only 30+" />
          </Tabs>
          <Tabs value={value} onChange={this.handleFoodChange}>
            <Tab label="Show All Meetups" />
            <Tab label="Find Catered Dinner" />
            <Tab label="Find Pizza/Dinner/Any Food" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterBar);
