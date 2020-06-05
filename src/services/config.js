let url;
if (process.env.NODE_ENV === 'development') url = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') url = 'https://signup-and-login-temp-rails.herokuapp.com';

export default url;