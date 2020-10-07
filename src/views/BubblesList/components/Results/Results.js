import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { colors } from '@material-ui/core';
import { Paginate } from 'components';
import BubbleCard from './BubbleCard';
// import { getBubblesRequest } from 'actions/bubbleActions';
// import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
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

const Bubbles = props => {
  const { className, ...rest } = props;
  // const { bubbles, loading } = useSelector(({ bubbles }) => bubble);
  // const dispatch = useDispatch();
  const classes = useStyles();
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Mais recente');
  const [mode, setMode] = useState('grid');
  const [bubbles, setBubbles] = useState([]);

  const bubble = (id) => ({
    id: id,
    title: 'Sci-Fi',
    author: {
      name: 'Anje Keizer',
      avatar: '/images/avatars/avatar_5.png'
    },
    price: '12,500',
    currency: '$',
    type: 'Full-Time',
    location: 'Europe',
    status: 'In progress',
    members: 5,
    tags: [
      {
        text: 'Cinema',
        color: colors.green[600]
      }
    ],
    start_date: moment(),
    end_date: moment(),
    updated_at: moment().subtract(24, 'minutes')
  });

  useEffect(() => {
    const list = [];
    for (let index = 0; index < 5; index++) {
      list.push(bubble(index));
    }
    
    setBubbles(list);
  }, []);

  // useEffect(() => {
  //   dispatch(getBubblesRequest())
  // }, [dispatch]);

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h5"
        >
          Mostrando {bubbles.length} bolhas
        </Typography>
        <div className={classes.actions}>
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <Grid
        container
        spacing={3}
      >
        {bubbles.map(bubble => (
          <Grid
            item
            key={bubble.id}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <BubbleCard bubble={bubble} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.paginate}>
        <Paginate pageCount={3} />
      </div>
      <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
      >
        {['Mais recente', 'Popular', 'Mais antigo', 'Menos popular'].map(
          option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

Bubbles.propTypes = {
  className: PropTypes.string
};

export default Bubbles;
