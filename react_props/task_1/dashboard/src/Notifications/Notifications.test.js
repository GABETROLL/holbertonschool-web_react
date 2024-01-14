import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('<Notifications />', () => {
  /* ADD TEST FOR CRASH */

  it('renders 3 <li />', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('li')).toHaveLength(3);
  });

  it('renders <p>Here is the list of notifications</p>', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });
});
