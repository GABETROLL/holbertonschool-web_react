import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('getFullYear', () => {
  it('returns the current year', () => {
    // ?
    expect(getFullYear()).toBe((new Date()).getFullYear());
  });
});

describe('getFooterCopy', () => {
  it('returns the correct string when its `index` argument is true or false', () => {
    expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
    expect(getFooterCopy(true)).toEqual('Holberton School');
  });
});

describe('getLatestNotification', () => {
  it('returns: "<strong>Urgent requirement</strong> - complete by EOD"', () => {
    expect(getLatestNotification()).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
