import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('getFullYear', () => {
  it('returns the current year', () => {
    const fakeYear = 2024;
    const fakeNow = new Date();
    fakeNow.setFullYear(fakeYear);

    jest.useFakeTimers({});
    jest.setSystemTime(fakeNow);

    // console.log(fakeYear, fakeNow.getFullYear());

    expect(getFullYear()).toBe(fakeYear);
  });
});

describe('getFooterCopy', () => {
  it("returns 'Holberton School main dashboard' when called with false", () => {
    expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
  });
  it("returns 'Holberton School' when called with true", () => {
    expect(getFooterCopy(true)).toEqual('Holberton School');
  });
});

describe('getLatestNotification', () => {
  it('returns "<strong>Urgent requirement</strong> - complete by EOD"', () => {
    expect(getLatestNotification()).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
