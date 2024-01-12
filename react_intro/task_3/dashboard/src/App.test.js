import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import assert from 'assert';

describe('<MyComponent />', () => {
  it('renders a <div> with the class `App-header`', () => {
    const wrapper = shallow(<App/>);
    assert.equal(wrapper.find('div.App-header').length, 1);
  });

  it('renders a <div> with the class `App-body`', () => {
    const wrapper = shallow(<App/>);
    assert.equal(wrapper.find('div.App-body').length, 1);
  });

  it('renders a <div> with the class `App-footer`', () => {
    const wrapper = shallow(<App/>);
    assert.equal(wrapper.find('div.App-footer').length, 1);
  });
});
