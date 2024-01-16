import { shallow } from 'enzyme';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('at the very least renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    const pElements = wrapper.find(<p />);

    expect(pElements).toHaveLength(1);
    expect(pElements.first().text().startsWith('Copyright')).toBe(true);
  });
});
