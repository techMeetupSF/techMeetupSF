import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,

  },
  chip: {
    margin: theme.spacing.unit,
    fontWeigt:  600,
    fontSize: '15px',
  },
});

function Chips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip label="CATERED DINNER"
        color="primary"
        className={classes.chip} />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
