import { getFullYear, getFooterCopy, getLatestNotification } from './utils';
import assert from 'assert';

describe('getFullYear', () => {
  it('returns the current year', () => {
    // ?
    assert.equal(getFullYear(), (new Date()).getFullYear());
  });
});

describe('getFooterCopy', () => {
  it('returns the correct string when its `index` argument is true or false', () => {
    assert.equal(getFooterCopy(false), 'Holberton School main dashboard');
    assert.equal(getFooterCopy(true), 'Holberton School');
  });
});

describe('getLatestNotification', () => {
  it('returns: "<strong>Urgent requirement</strong> - complete by EOD"', () => {
    assert.equal(getLatestNotification(), '<strong>Urgent requirement</strong> - complete by EOD');
  });
});
