import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct html depending on the `type` and `value` props', () => {
    for (const typeProp of [undefined, 'default', 'urgent']) {
      const wrapper = shallow(<NotificationItem type={typeProp} />);
      expect(wrapper.prop('data-notification-type')).toBe(typeProp || 'default');
    }

    for (const valueProp of [undefined, 'test notification']) {
      const wrapper = shallow(<NotificationItem value={valueProp} />);
      expect(wrapper.text()).toBe(valueProp || ''); 
    }
  });

  it('renders the `html` property as its inner HTML, and the `html` property takes priority over `value`', () => {
    for (const valueProp of [undefined, 'unused']) {
      const htmlProp = "<strong>urgent</strong>";
      const wrapper = shallow(<NotificationItem value={valueProp} html={htmlProp} />);
      expect(wrapper.html()).toBe(htmlProp);
    }
  });
});
