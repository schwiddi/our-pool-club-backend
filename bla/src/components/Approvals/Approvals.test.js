import { isSearched, matchAction, matchStatus } from './Approvals';
import { actionFilter, statusFilter } from './';

describe('Approval Component functions', () => {
  it('filter by search', () => {
    const id = 'test';

    const mismatchedFilter = {
      id,
      value: 'value123',
    };

    const matchedFilter = {
      id,
      value: 'value',
    };

    const row = {
      test: 'stored value',
    };

    expect(isSearched(mismatchedFilter, row)).toEqual(false);
    expect(isSearched(matchedFilter, row)).toEqual(true);
  });

  it('matchAction', () => {
    const id = 'action';

    const mismatchedFilter = {
      id,
      value: 'value123',
    };

    const matchedFilter = {
      id,
      value: 'value',
    };

    const allFilter = {
      id,
      value: actionFilter.ALL,
    };

    const row = {
      [id]: 'value',
    };

    expect(matchAction(mismatchedFilter, row)).toEqual(false);
    expect(matchAction(matchedFilter, row)).toEqual(true);
    expect(matchAction(allFilter, row)).toEqual(true);
  });

  it('matchStatus', () => {
    const id = 'status';

    const mismatchedFilter = {
      id,
      value: 'value123',
    };

    const matchedFilter = {
      id,
      value: 'value',
    };

    const allFilter = {
      id,
      value: statusFilter.ALL,
    };

    const row = {
      [id]: 'value',
    };

    expect(matchStatus(mismatchedFilter, row)).toEqual(false);
    expect(matchStatus(matchedFilter, row)).toEqual(true);
    expect(matchStatus(allFilter, row)).toEqual(true);
  });
});
