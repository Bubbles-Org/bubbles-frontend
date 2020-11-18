import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

import { Page } from 'components';
import { Header, Overview } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getBubbleDetailsRequest } from 'actions/bubbleActions';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const BubbleDetails = props => {
  const { match } = props;
  const { id } = match.params;
  const classes = useStyles();
  const { bubble, loading } = useSelector(({ bubble }) => bubble);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBubbleDetailsRequest(id))
  }, [dispatch, id]);

  return !loading && !isEmpty(bubble) && (
    <Page
      className={classes.root}
      title="Bubble Details"
    >
      <Header bubble={bubble} />
      <div className={classes.content}>
        <Overview bubble={bubble} />
      </div>
    </Page>
  );
};

BubbleDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BubbleDetails;
