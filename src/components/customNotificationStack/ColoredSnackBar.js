import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.secondary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    maxWidth: 420,
  },
  content: {
    flexWrap: 'nowrap',
  },
});

const ColoredSnackbar = ({ classes, className, message, onClose, variant, ...props }) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      action={[
        <IconButton
          aria-label="Close"
          className={classes.close}
          color="inherit"
          key="close"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      aria-describedby="client-snackbar"
      className={classNames(classes[variant], className)}
      message={
        <span
          className={classes.message}
          id="client-snackbar"
        >
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...props}
    />
  );
};

ColoredSnackbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(ColoredSnackbar);
