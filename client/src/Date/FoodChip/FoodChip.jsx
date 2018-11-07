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
    cursor: 'pointer',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
