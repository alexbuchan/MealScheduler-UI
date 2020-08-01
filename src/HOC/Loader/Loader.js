import React from 'react';
import PropTypes from 'prop-types';

const withLoader = (WrappedComponent) => {
  const propTypes = {
    isLoading: PropTypes.bool,          // Determines whether the loader displays or the wrapped component
    loaderClassName: PropTypes.string,  // Styles class for the loader
    props: PropTypes.object             // Props to be passed to the wrapped component
  };

  const Loader = ({ isLoading, ...props }) => {
    if (!isLoading) return <WrappedComponent { ...props } />;
    return (
      <div className='loader-wrapper'>
        <h3 className='loader'></h3>
      </div>
    );
  }

  Loader.propTypes = propTypes;
  return Loader;
}

export default withLoader;