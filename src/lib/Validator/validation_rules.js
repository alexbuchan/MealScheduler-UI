import { isEmpty, usernameLength, isValidEmail, passwordLength } from './validation_methods';

const validations = [
  {
    field: 'username',
    methodName: 'isEmpty',
    method: isEmpty,
    validWhen: false,
    message: 'Username is required.'
  },
  {
    field: 'username',
    methodName: 'usernameLength',
    method: usernameLength,
    validWhen: true,
    message: 'Username should be longer than 3 characters.'
  },
  {
    field: 'email',
    methodName: 'isEmpty',
    method: isEmpty,
    validWhen: false,
    message: 'Email is required.'
  },
  {
    field: 'email',
    methodName: 'isValidEmail',
    method: isValidEmail,
    validWhen: true,
    message: 'That is not a valid email.'
  },
  {
    field: 'password',
    methodName: 'isEmpty',
    method: isEmpty,
    validWhen: false,
    message: 'Password is required.'
  },
  {
    field: 'password',
    methodName: 'passwordLength',
    method: passwordLength,
    validWhen: true,
    message: 'Password should be longer than 6 characters.'
  }
];

export default validations;