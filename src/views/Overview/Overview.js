import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Page } from 'components';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    textAlign: 'center',
    padding: theme.spacing(3)
  },

}));

const Overview = () => {
  const classes = useStyles();
  const session = useSelector(state => state.session);

  return (
    <Page
      className={classes.root}
      title="Início"
    >
      <div
        className={classes.root}
      >
        <Typography
          component="h1"
          gutterBottom
          variant="h3"
        >
          Bem-vindo, {session.user.first_name}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
        >
          Demonstração
        </Typography>
      </div>
    </Page>
  );
};

export default Overview;
