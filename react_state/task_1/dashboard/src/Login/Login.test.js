import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from  './Login';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Login />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 3 input tags and 2 label tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it(`renders a submit input, that's disabled by default`, () => {
    const wrapper = mount(<Login />);
    expect(wrapper.state('enableSubmit')).toBe(false);
    expect(wrapper.find('input[type="submit"]').first().prop('disabled')).toBe(true);
  });
  it(`renders email and password inputs. When their values change, they enable the submit button if they're both not empty. Otherwise, they disable it`, () => {
    const wrapper = mount(<Login />);
    const submitButtonSelector = 'input[type="submit"]';
    let foundButton;

    // one empty should result in the submit button being disabled
    wrapper.find(`input[type="email"]`).first()
      .simulate('change', { target: { name: 'email', value: 'test@test.test' }});
    expect(wrapper.state('enableSubmit')).toBe(false);

    foundButton = wrapper.find(submitButtonSelector).first();
    expect(foundButton.prop('disabled')).toBe(true);

    // both not empty should result in the submit button being enabled
    wrapper.find(`input[type="password"]`).first()
      .simulate('change', { target: { name: 'password', value: 'supersecurepass' }});
    expect(wrapper.state('enableSubmit')).toBe(true);

    foundButton = wrapper.find(submitButtonSelector).first();
    expect(foundButton.prop('disabled')).toBe(false);
  });
});
