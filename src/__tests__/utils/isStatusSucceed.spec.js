import { isStatusSucceed } from 'base/utils';
import * as CONSTANTS from 'store/CONSTANTS';

describe('check is status succeed', () => {
  it('should return false on improper type passed', () => {
    const someNumericValue = 1;
    const status = isStatusSucceed(someNumericValue);
    expect(status).toEqual(false);
  });

  it('should return false if status not "succeed"', () => {
    const status = isStatusSucceed(CONSTANTS.FAILURE);
    expect(status).toEqual(false);
  });

  it('should return true if status "succeed"', () => {
    const status = isStatusSucceed(CONSTANTS.SUCCEED);
    expect(status).toEqual(true);
  });
});
