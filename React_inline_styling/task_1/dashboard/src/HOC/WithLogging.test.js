import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('WithLogging(Component)', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it(`returns a wrap component that calls console.log('Component Component is mounted') after it's mounted\
and console.log('Component Component is going to unmount ') before it's unmounted,\
when called with the (() => <p />) function component`, () => {
    const WithLoggingWrapperComponent = WithLogging(() => <p />);
    const wrapper = mount(<WithLoggingWrapperComponent />);
    expect(console.log.mock.calls).toEqual([['Component Component is mounted']]);
    wrapper.unmount();
    expect(console.log.mock.calls).toEqual([['Component Component is mounted'], ['Component Component is going to unmount']]);
  });

  it(`returns a wrap component that calls console.log('Component Login is mounted') after it's mounted\
and console.log('Component Login is going to unmount ') before it's unmounted,\
when called with the 'Login' component`, () => {
    const WithLoggingWrapperComponent = WithLogging(Login);
    const wrapper = mount(<WithLoggingWrapperComponent />);
    expect(console.log.mock.calls).toEqual([['Component Login is mounted']]);
    wrapper.unmount();
    expect(console.log.mock.calls).toEqual([['Component Login is mounted'], ['Component Login is going to unmount']]);
  });
});
