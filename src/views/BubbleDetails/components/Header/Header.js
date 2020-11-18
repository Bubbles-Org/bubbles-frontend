import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateBubbleRequest } from 'actions/bubbleActions';
import { Label } from 'components';
import {
  Typography,
  Grid,
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    marginTop: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  applyButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const Header = props => {
  const { bubble, className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const session = useSelector(({session}) => session);
  const [openAddRecomendation, setOpenAddRecomendation] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const [values, setValues] = useState({
    genericField: '',
  });

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleAddRecomendation = () => {
    dispatch(
      updateBubbleRequest({
        id: bubble._id,
        info: {
          text: values.genericField,
          tags: [values.genericField],
          userId: session.loggedUser.id
        }
      })
    );
    setOpenAddRecomendation(false);
  };

  const handleAddUser = () => {
    dispatch(
      updateBubbleRequest({
        role: 'membro',
        emailToAdd: values.genericField,
        bubbleId: bubble._id
      },
      true
      )
    );
    setOpenAddUser(false);
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
            component="h2"
            gutterBottom
            variant="overline"
          >
            Bubble details
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            {bubble.name}
          </Typography>
          <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined"
          >
            Active bubble
          </Label>
          <div></div>
          {bubble.users?.filter(user => user.role === 'owner')[0].userId === session.loggedUser.id && (
            <Button
              className={classes.shareButton}
              onClick={() => setOpenAddUser(true)}
              variant="contained"
            >
              Adicionar usuário
            </Button>
          )}
          <Button
            className={classes.applyButton}
            onClick={() => setOpenAddRecomendation(true)}
            variant="contained"
          >
            Adicionar recomendação
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openAddRecomendation || openAddUser} onClose={() => {
        if (openAddRecomendation) {
          setOpenAddRecomendation(false);
        } else {
          setOpenAddUser(false);
        }
      } } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{openAddRecomendation ? 'Adicionar recomendação' : 'Adicionar Usuário'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="genericField"
            label={openAddRecomendation ? 'Recomendação' : 'Email do usuário'}
            type="text"
            onChange={event =>
              handleFieldChange(event, "genericField", event.target.value)
            }
            value={values.genericField}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (openAddRecomendation) {
                setOpenAddRecomendation(false);
              } else {
                setOpenAddUser(false);
              }
            }}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (openAddRecomendation) {
                handleAddRecomendation();
              } else {
                handleAddUser();
              }
            }}
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
  className: PropTypes.string,
  bubble: PropTypes.object.isRequired
};

Header.defaultProps = {};

export default Header;
