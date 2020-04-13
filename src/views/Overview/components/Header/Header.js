import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const session = useSelector(state => state.session);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
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
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
