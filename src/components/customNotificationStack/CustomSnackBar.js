import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import ColoredSnackBar from './ColoredSnackBar';

const CustomSnackBar = ({ ContentProps, autoHideDuration, ...props }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      autoHideDuration={autoHideDuration || 3000}
      onClose={handleClose}
      open={open}
      {...props}
    >
      <ColoredSnackBar
        {...ContentProps}
        onClose={handleClose}
      />
    </Snackbar>
  );
};

CustomSnackBar.propTypes = {
  ContentProps: PropTypes.shape({
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    variant: PropTypes.string
  }),
  autoHideDuration: PropTypes.number,
};

export default CustomSnackBar;
