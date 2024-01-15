import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('<Notifications />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Notifications />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 3 <li />', () => {
    expect(wrapper.find('li')).toHaveLength(3);
  });

  it('renders <p>Here is the list of notifications</p>', () => {
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });
});
