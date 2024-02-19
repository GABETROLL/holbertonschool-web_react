import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<BodySection />', () => {
  it('should renders correctly the `title` prop as an <h2 /> and its children', () => {
    const title = 'Hello, World!';
    const pText = 'This is a test';
    const buttonText = 'Click me!'

    let wrapper;
    let foundH2;
    let foundP;

    wrapper = shallow(<BodySection title={title} />);
    expect(wrapper.children()).toHaveLength(1);
    foundH2 = wrapper.find('h2');
    expect(foundH2).toHaveLength(1);
    expect(foundH2.first().text()).toBe(title);

    wrapper = shallow(
      <BodySection title={title}>
        <p>{pText}</p>
      </BodySection>
    );
    expect(wrapper.children()).toHaveLength(2);

    foundH2 = wrapper.find('h2');
    expect(foundH2).toHaveLength(1);
    expect(foundH2.first().text()).toBe(title);

    foundP = wrapper.find('p');
    expect(foundP).toHaveLength(1);
    expect(foundP.first().text()).toBe(pText);

    wrapper = shallow(
      <BodySection title={title}>
        <p>{pText}</p>
        <button>{buttonText}</button>
      </BodySection>
    );
    expect(wrapper.children()).toHaveLength(3);

    foundH2 = wrapper.find('h2');
    expect(foundH2).toHaveLength(1);
    expect(foundH2.first().text()).toBe(title);

    foundP = wrapper.find('p');
    expect(foundP).toHaveLength(1);
    expect(foundP.first().text()).toBe(pText);

    const foundButton = wrapper.find('button');
    expect(foundButton).toHaveLength(1);
    expect(foundButton.first().text()).toBe(buttonText);
  });
});
