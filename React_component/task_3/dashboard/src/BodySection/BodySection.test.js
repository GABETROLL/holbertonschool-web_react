import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('<BodySection />', () => {
  it('should renders correctly the `title` prop as an <h2 /> and its children', () => {
    const title = 'Hello, World!';
    const pText = 'This is a test';

    let wrapper;
    let foundH2;

    wrapper = shallow(<BodySection title={title} />);
    foundH2 = wrapper.find('h2');
    expect(foundH2).toHaveLength(1);
    expect(foundH2.first().text()).toBe(title);

    wrapper = shallow(
      <BodySection title={title}>
        <p>{pText}</p>
      </BodySection>
    );
    foundH2 = wrapper.find('h2');
    expect(foundH2).toHaveLength(1);
    expect(foundH2.first().text()).toBe(title);

    const foundP = wrapper.find('p');
    expect(foundP).toHaveLength(1);
    expect(foundP.first().text()).toBe(pText);
  });
});
