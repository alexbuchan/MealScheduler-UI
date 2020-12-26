import React from 'react';
import PropTypes from 'prop-types';

const withLoader = (WrappedComponent, loaderScreen) => {
  const propTypes = {
    isLoading: PropTypes.bool,          // Determines whether the loader displays or the wrapped component
    loaderClassName: PropTypes.string,  // Styles class for the loader
    props: PropTypes.object             // Props to be passed to the wrapped component
  };

  const CustomLoadingScreen = loaderScreen;

  const Loader = ({ isLoading, ...props }) => {
    const displayLoaderScreen = () => {
      if (CustomLoadingScreen !== undefined) {
        return (
          <CustomLoadingScreen>
            <h3 className='loader'></h3>
          </CustomLoadingScreen>
        );
      }

      return (
        <div className={'loader-wrapper'}>
          <h3 className='loader'></h3>
        </div>
      );
    }

    if (!isLoading) return <WrappedComponent { ...props } />;
    return displayLoaderScreen();
  }

  Loader.propTypes = propTypes;
  return Loader;
}

export default withLoader;