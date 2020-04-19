import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

import { Topbar } from './components';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 86,
    }
  }
}));

const Auth = props => {
  const { route } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <Topbar />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
