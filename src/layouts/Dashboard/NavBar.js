import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Divider, Paper, Avatar, Typography, Button } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import useRouter from 'utils/useRouter';
import { Navigation } from 'components';
import navigationConfig from './navigationConfig';
import { logoutRequest } from 'actions/sessionActions';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 90,
    height: 90
  },
  name: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
  // eslint-disable-next-line
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={session.loggedUser.avatar}
          to="/profile/1/timeline"
        />
        <Typography
          className={classes.name}
          variant="h4"
        >
          {session.loggedUser.name}
        </Typography>
        <Typography variant="body2">{session.loggedUser.role}</Typography>
      </div>
      <Divider className={classes.divider} />
      <Divider />
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
        {openMobile && (
          <Button
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon className={classes.logoutIcon} />
          Sair
          </Button>
        )}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
