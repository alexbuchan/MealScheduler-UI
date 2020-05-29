import React from 'react';
import { shallow } from 'enzyme';

export const componentSetup = (Component, props = {}, options = {}) => {
  const instance = shallow(<Component { ...props } />, options);
  return instance;
}

export const findByTestAttribute = (instance, attribute) => {
  const wrapper = instance.find(`[data-test="${attribute}"]`);
  return wrapper;
}