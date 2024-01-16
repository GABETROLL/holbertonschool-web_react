import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a div with the class `App-header`', () => {
    expect(wrapper.find('div.App-header')).toHaveLength(1);
  });

  it('renders a div with the class `App-body`', () => {
    expect(wrapper.find('div.App-body')).toHaveLength(1);
  });

  it('renders a div with the class `App-footer`', () => {
    expect(wrapper.find('div.App-footer')).toHaveLength(1);
  });
});
