import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,

  },
  chip: {
    margin: theme.spacing.unit,
    fontWeight:  600,
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: '32px',
    paddingLeft: '12px',
    paddingRight: '12px',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
});

function Chips(props) {
  const { classes, tag, color } = props;
  return (
    <div className={classes.root}>
      <Chip label={tag.toUpperCase()}
        className={classes.chip} />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
  tag: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(styles)(Chips);
