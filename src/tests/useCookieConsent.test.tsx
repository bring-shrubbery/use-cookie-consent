import {renderHook, act} from '@testing-library/react-hooks';
import {useCookieConsent} from '../useCookieConsent';

describe('hook tests', () => {
  describe('all cookies get/set', () => {
    it('should accept all cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.acceptAllCookies());

      expect(result.current.didAcceptAll()).toBeTruthy();
      expect(result.current.didDeclineAll()).toBeFalsy();
    });

    it('should decline all cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.declineAllCookies());

      expect(result.current.didDeclineAll()).toBeTruthy();
      expect(result.current.didAcceptAll()).toBeFalsy();
    });
  });

  describe('provenance cookies', () => {
    it('should be able to accept and decline third party cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.acceptCookies({thirdParty: true}));
      expect(result.current.consent.thirdParty).toBeTruthy();

      act(() => result.current.acceptCookies({thirdParty: false}));
      expect(result.current.consent.thirdParty).toBeFalsy();
    });

    it('should be able to accept and decline first party cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.acceptCookies({firstParty: true}));
      expect(result.current.consent.firstParty).toBeTruthy();

      act(() => result.current.acceptCookies({firstParty: false}));
      expect(result.current.consent.firstParty).toBeFalsy();
    });
  });

  describe('duration cookies', () => {
    it('should be able to accept and decline session cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.acceptCookies({session: true}));
      expect(result.current.consent.session).toBeTruthy();

      act(() => result.current.acceptCookies({session: false}));
      expect(result.current.consent.session).toBeFalsy();
    });

    it('should be able to accept and decline persistent cookies', async () => {
      const {result} = renderHook(() => useCookieConsent());

      act(() => result.current.acceptCookies({persistent: true}));
      expect(result.current.consent.persistent).toBeTruthy();

      act(() => result.current.acceptCookies({persistent: false}));
      expect(result.current.consent.persistent).toBeFalsy();
    });
  });

  describe('hook options', () => {
    it('should have defaultConsent option persist for initial value, but not after updating', async () => {
      const {result} = renderHook(() =>
        useCookieConsent({
          defaultConsent: {
            session: true,
            persistent: true,
            necessary: true,
            preferences: true,
            statistics: true,
            marketing: true,
            firstParty: true,
            thirdParty: true,
          },
        })
      );

      expect(result.current.consent.session).toBeTruthy();
      expect(result.current.consent.persistent).toBeTruthy();
      expect(result.current.consent.necessary).toBeTruthy();
      expect(result.current.consent.preferences).toBeTruthy();
      expect(result.current.consent.statistics).toBeTruthy();
      expect(result.current.consent.marketing).toBeTruthy();
      expect(result.current.consent.firstParty).toBeTruthy();
      expect(result.current.consent.thirdParty).toBeTruthy();

      act(() => result.current.declineAllCookies());

      expect(result.current.consent.session).toBeFalsy();
      expect(result.current.consent.persistent).toBeFalsy();
      expect(result.current.consent.preferences).toBeFalsy();
      expect(result.current.consent.statistics).toBeFalsy();
      expect(result.current.consent.marketing).toBeFalsy();
      expect(result.current.consent.firstParty).toBeFalsy();
      expect(result.current.consent.thirdParty).toBeFalsy();
    });
  });

  // TODO: Implement purpose cookie tests

  // TODO: Test cookie wrapper or even better, allow providing own storage wrapper in the hook.
});
