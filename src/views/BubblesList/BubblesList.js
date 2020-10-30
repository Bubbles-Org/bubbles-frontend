import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page, AuthGuard } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  filter: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(6)
  }
}));

const BubblesList = () => {
  const classes = useStyles();

  return (
    <AuthGuard>
      <Page
        className={classes.root}
        title="Bubbles List"
      >
        <Header className={classes.header} />
        <Results className={classes.results} />
      </Page>
    </AuthGuard>
  );
};

export default BubblesList;
