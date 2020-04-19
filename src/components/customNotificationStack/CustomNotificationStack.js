import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomSnackBar from './CustomSnackBar';
import { useSelector } from 'react-redux';

const styles = {
  success: {
    width: 400,
    color: 'white',
    flexWrap: 'nowrap'
  },
  error: {
    width: 400,
    backgroundColor: '#b3001b',
    color: 'white',
    flexWrap: 'nowrap'
  },
  warning: {
    width: 400,
    color: 'white',
    flexWrap: 'nowrap'
  },
  info: {
    width: 400,
    color: 'white',
    flexWrap: 'nowrap'
  },
  icon: {
    marginRight: '6px'
  }
};

const NotificationStack = () => {
  const { data } = useSelector(({ notification }) => notification);
  return (
    <>
      {data.map(notification => (
        <CustomSnackBar
          autoHideDuration={notification.autoHideDuration}
          ContentProps={{ message: notification.message, variant: notification.variant }}
          key={notification.id}
        />
      ))
      }
    </>
  );
}


export default withStyles(styles)(NotificationStack);
