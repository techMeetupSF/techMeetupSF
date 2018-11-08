import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './filter_bar.css';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '20px',
  },
  appBar: {
    flexDirection: 'column',
    justifyContent:'space-between',
    paddingLeft: '20px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      paddingLeft: '0px',
    },
    padding: '10px 0',
  },
  logo: {
    fontFamily: "Roboto",
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '22px',
    letterSpacing: '1px',
    padding: '10px 30px 0px 30px',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  filterText: {
    fontSize: '17px',
    fontWeight: 'bold',
  },
  rightLogo: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: '200px',
    },
  }
});

class FilterBar extends React.Component {

  render() {
    const { classes, showThirtyPlus, showFood, handleRsvpSwitch, handleFoodChange } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={ classes.appBar }>
          <div className="left-logo">
            <div className={ classes.logo }> TECH MEETUP SF </div>
            <Tabs value={showThirtyPlus} onChange={handleRsvpSwitch}>
            <Tab className={ classes.filterText } label="0-30 RSVPs" />
            <Tab className={ classes.filterText } label="Only 30+ RSVPs" />
            </Tabs>
          </div>
          <Tabs className={classes.rightLogo} value={showFood} onChange={handleFoodChange}>
            <Tab className={ classes.filterText } label="Include No Food" />
            <Tab className={ classes.filterText } label="Catered Dinner" />
            <Tab className={ classes.filterText } label="Any Food" />
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
