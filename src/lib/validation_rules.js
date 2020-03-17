import ValidationMethods from './validation_methods'
const {
  isEmpty,
  usernameLength,
  isValidEmail,
  passwordLength
} = ValidationMethods;

const validations = [
  {
    field: 'username',
    method: isEmpty,
    validWhen: false,
    message: 'Username is required.'
  },
  {
    field: 'username',
    method: usernameLength,
    validWhen: true,
    message: 'Username should be longer than 3 characters.'
  },
  {
    field: 'email',
    method: isEmpty,
    validWhen: false,
    message: 'Email is required.'
  },
  {
    field: 'email',
    method: isValidEmail,
    validWhen: true,
    message: 'That is not a valid email.'
  },
  {
    field: 'password',
    method: isEmpty,
    validWhen: false,
    message: 'Password is required.'
  },
  {
    field: 'password',
    method: passwordLength,
    validWhen: true,
    message: 'Password should be longer than 6 characters.'
  }
];

export default validations;