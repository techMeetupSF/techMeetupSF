import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  groupName: {
    color: 'rgba(0,0,0,.54)',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 2,
  },
  bigText: {
    fontSize: '24px',
    lineHeight: 1.25,
    fontWeight: 600,
  },
  subDetails: {
    color: 'rgba(0,0,0,.54)',
    fontSize: '16px',
    paddingBottom: '7px',
  },

};

function MaterialCardText(props) {
  const { classes, text, styleName } = props;

  return (
      <Typography component="h5" className={classes[styleName]}>
       {text}
      </Typography>
  );
}

MaterialCardText.propTypes = {
  text: PropTypes.string,
  styleName: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialCardText);
