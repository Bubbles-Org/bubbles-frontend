import validate from 'validate.js';

const regex = (value, options) => {
  const regExp = new RegExp(options.pattern);

  if (!regExp.test(value)) {
    console.log(options)
    return options.message;
  }
};

const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'deve ser marcado';
  }
};

validate.validators = {
  ...validate.validators,
  regex,
  checked
};

validate.validators.email.message = 'inválido';