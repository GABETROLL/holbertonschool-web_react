import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';

describe('<App />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains one Notifications component', () => {
    expect(wrapper.find(<Notifications />)).toHaveLength(1);
  });
  it('contains one Header component', () => {
    expect(wrapper.find(<Header />)).toHaveLength(1);
  });
  it('contains one Login component', () => {
    expect(wrapper.find(<Login />)).toHaveLength(1);
  });
  it('contains one Footer component', () => {
    expect(wrapper.find(<Footer />)).toHaveLength(1);
  });
});
