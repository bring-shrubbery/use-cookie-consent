import {allCookiesSetToValue, allPropsApproved} from '../utils';

describe('utilities', () => {
  it('should correctly set all cookies to a true', () => {
    const result = allCookiesSetToValue(true);
    const reducedResult = Object.values(result).reduce(
      (prev, curr) => prev && curr,
      true
    );
    expect(reducedResult).toBe(true);
  });

  it('should correctly set all cookies to a false', () => {
    const {necessary, ...all} = allCookiesSetToValue(false);
    const reducedResult = Object.values(all).reduce(
      (prev, curr) => prev || curr,
      false
    );
    expect(reducedResult).toBe(false);
    expect(necessary).toBe(true);
  });

  it('should correctly check if any props are disapproved', () => {
    const result = allPropsApproved(
      {
        purpose: 'marketing',
        duration: 'session',
        provenance: 'firstParty',
      },
      {
        firstParty: false,
        thirdParty: false,
        session: false,
        persistent: false,
        necessary: false,
        preferences: false,
        statistics: false,
        marketing: false,
      }
    );

    expect(result).toBe(false);
  });

  it('should correctly check if all props are approved', () => {
    const result = allPropsApproved(
      {
        purpose: 'marketing',
        duration: 'session',
        provenance: 'firstParty',
      },
      {
        firstParty: true,
        thirdParty: true,
        session: true,
        persistent: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      }
    );

    expect(result).toBe(true);
  });

  it("should say that props are disapproved when there's no consent", () => {
    const result = allPropsApproved({
      purpose: 'marketing',
      duration: 'session',
      provenance: 'firstParty',
    });

    expect(result).toBe(false);
  });

  it('all props are disapproved if duration is not approved', () => {
    const result = allPropsApproved(
      {
        purpose: 'marketing',
        duration: 'session',
        provenance: 'firstParty',
      },
      {
        firstParty: false,
        thirdParty: true,
        session: true,
        persistent: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      }
    );

    expect(result).toBe(false);
  });

  it('all props are disapproved if purpose is not approved', () => {
    const result = allPropsApproved(
      {
        purpose: 'marketing',
        duration: 'session',
        provenance: 'firstParty',
      },
      {
        firstParty: true,
        thirdParty: true,
        session: true,
        persistent: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: false,
      }
    );

    expect(result).toBe(false);
  });
});
