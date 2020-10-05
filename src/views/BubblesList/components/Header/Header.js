import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { createBubbleRequest } from 'actions/bubbleActions';

const useStyles = makeStyles(theme => ({
  root: {},
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openCreate, setOpenCreate] = useState(false);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleCreate = () => {
    dispatch(createBubbleRequest(values))
    setOpenCreate(false);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h1"
            variant="h3"
          >
            Bolhas
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => setOpenCreate(true)}
            variant="contained"
          >
            <AddIcon className={classes.addIcon} />
            Criar bolha
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openCreate} onClose={() => setOpenCreate(false) } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Criar nova bolha</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Título"
            type="text"
            onChange={event =>
              handleFieldChange(event, "title", event.target.value)
            }
            value={values.title}
            fullWidth
          />
          <TextField
            required
            multiline
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            onChange={event =>
              handleFieldChange(event, "description", event.target.value)
            }
            value={values.description}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCreate(false)}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
