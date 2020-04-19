import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link
} from '@material-ui/core';

import useRouter from 'utils/useRouter';

const required = { allowEmpty: false, message: 'é obrigatório' };

/**
 * This attributes are in portuguese is just because validate.js get the name of attribute and includes then
 * in the init of the alert message. For example: The previous attribute name to 'senhas'
 * it was 'confirmPassword' and the alert message when the 'confirmPassword' does not match
 * with the attribute 'password', it was 'Confirm password <personalized message>'.
 * Our interface is in brazilian portuguese and we want to show 'Senhas não correspondem' that mean 'Passwords not match'.
 * So, for that reason I put the name of the attribute 'senhas'.
 * - Tiago L. Pereira
 */

const schema = {
  nome: {
    presence: required,
    length: {
      maximum: 32
    }
  },
  email: {
    presence: required,
    email: true,
    length: {
      maximum: 64
    }
  },
  senha: {
    presence: required,
    length: {
      maximum: 128
    }
  },
  senhas: {
    presence: required,
    equality: {
      attribute: 'senha',
      message: 'não correspondem',
      comparator: (v1, v2) => {
        return v1 === v2;
      }
    },
    length: {
      maximum: 128
    }
  },
  termos: {
    presence: required,
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  policy: {
    marginLeft: '6px',
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const RegisterForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('nome')}
          fullWidth
          helperText={
            hasError('nome') ? formState.errors.nome[0] : null
          }
          label="Nome"
          name="nome"
          onChange={handleChange}
          value={formState.values.nome || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('senha')}
          fullWidth
          helperText={
            hasError('senha') ? formState.errors.senha[0] : null
          }
          label="Senha"
          name="senha"
          onChange={handleChange}
          type="password"
          value={formState.values.senha || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('senhas')}
          fullWidth
          helperText={
            hasError('senhas') ? formState.errors.senhas[0] : null
          }
          label="Confirmar senha"
          name="senhas"
          onChange={handleChange}
          type="password"
          value={formState.values.senhas || ''}
          variant="outlined"
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.termos || false}
              className={classes.policyCheckbox}
              color="primary"
              name="termos"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Eu li os{' '}
              <Link
                color="secondary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                Termos e Condições
              </Link>
            </Typography>
          </div>
          {hasError('termos') && (
            <FormHelperText error>{formState.errors.termos[0]}</FormHelperText>
          )}
        </div>
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Criar conta
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
