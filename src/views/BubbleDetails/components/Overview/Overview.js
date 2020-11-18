import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Brief } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

const Overview = props => {
  const { bubble, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <Brief recomendations={bubble.recomendations} />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
      </Grid>
    </Grid>
  );
};

Overview.propTypes = {
  className: PropTypes.string,
  bubble: PropTypes.object.isRequired
};

export default Overview;
