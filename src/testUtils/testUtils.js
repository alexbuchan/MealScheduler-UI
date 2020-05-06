import React from 'react';
import { shallow } from 'enzyme';

export const componentSetup = (Component, props = {}) => {
  const instance = shallow(<Component { ...props } />);
  return instance;
}

export const findByTestAttribute = (instance, attribute) => {
  const wrapper = instance.find(`[data-test="${attribute}"]`);
  return wrapper;
}