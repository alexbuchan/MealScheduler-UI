const validation_methods = {
  isEmpty: (field) => {
    return (field.length === 0);
  },

  usernameLength: (username) => {
    return (username.length > 2);
  },

  isValidEmail: (email) => {
    const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
  },

  passwordLength: (password) => {
    return (password.length > 6);
  }
}

export default validation_methods;