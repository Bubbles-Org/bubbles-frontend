import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import BubbleCard from './BubbleCard';
import { getBubblesRequest } from 'actions/bubbleActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Bubbles = (props) => {
  const { className, ...rest } = props;
  const { bubbles, loading } = useSelector(({ bubble }) => bubble);
  const session = useSelector(({ session }) => session);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [mode] = useState('grid');

  useEffect(() => {
    if (session.sessionToken) dispatch(getBubblesRequest());
  }, [dispatch, session]);

  return (
    !loading && (
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.header}>
          <Typography className={classes.title} variant="h5">
            {`Mostrando ${bubbles.length} bolhas`}
          </Typography>
        </div>
        <Grid container spacing={3}>
          {bubbles.map((bubble) => (
            <Grid
              item
              key={bubble._id}
              md={mode === 'grid' ? 4 : 12}
              sm={mode === 'grid' ? 6 : 12}
              xs={12}>
              <BubbleCard bubble={bubble} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
};

Bubbles.propTypes = {
  className: PropTypes.string
};

export default Bubbles;
