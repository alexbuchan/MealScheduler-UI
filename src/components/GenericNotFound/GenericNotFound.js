import React from 'react';

const GenericNotFound = ({ location }) => {
  console.log(location.pathname)
  return (
    <div className='generic-not-found'>
    <h1>404: Not Found</h1>
    <h3>Page not found.</h3>
    </div>
  );
}

export default GenericNotFound;