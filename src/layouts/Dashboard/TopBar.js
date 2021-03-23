/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Typography
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { NotificationsPopover } from 'components';
import moment from 'moment';
import { logoutRequest } from 'actions/sessionActions';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  titleWhite: {
    color: 'white'
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, ] = useState([
    {
      id: 1,
      title: 'Teste 1',
      type: 'order',
      created_at: moment().subtract(2, 'hours')
    },
    {
      id: 2,
      title: 'Teste 2',
      type: 'user',
      created_at: moment().subtract(1, 'day')
    },
    {
      id: 3,
      title: 'Teste 3',
      type: 'project',
      created_at: moment().subtract(3, 'days')
    },
    {
      id: 4,
      title: 'Teste 4',
      type: 'feature',
      created_at: moment().subtract(7, 'days')
    }
  ]);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography
            className={classes.titleWhite}
            variant="h3"
          >Bubbles</Typography>
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon className={classes.logoutIcon} />
            Sair
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
