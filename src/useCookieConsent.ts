import {useState, useEffect} from 'react';
import * as Cookies from 'js-cookie';
import {COOKIE_CONSENT_KEY, EMPTY_CONSENT} from './constants';
import {
  CookieConsentHookState,
  CookieConsentOptions,
  CookieTypes,
  CookieWrapper,
} from './types';
import {allCookiesSetToValue, allPropsApproved} from './utils';

export const useCookieConsent = (
  options?: CookieConsentOptions
): CookieConsentHookState => {
  const initialConsent = Cookies.getJSON(COOKIE_CONSENT_KEY) as
    | CookieTypes
    | undefined;

  const [consent, setConsent] = useState<CookieTypes | undefined>(
    initialConsent || options?.defaultConsent
  );

  useEffect(() => {
    if (consent?.necessary) {
      Cookies.set(
        COOKIE_CONSENT_KEY,
        consent,
        options?.consentCookieAttributes
      );
    }
  }, [consent]);

  const acceptCookies = (cookies: CookieTypes) => {
    setConsent(cookies);
  };

  const declineAllCookies = () => {
    setConsent(allCookiesSetToValue(false));
  };

  const acceptAllCookies = () => {
    setConsent(allCookiesSetToValue(true));
  };

  const cookieWrapper: CookieWrapper = {
    set: (name, value, props, options) => {
      if (!allPropsApproved(props, consent)) return undefined;
      return Cookies.set(name, value, options);
    },
    get: Cookies.get,
    getAll: Cookies.get,
    getJSON: Cookies.getJSON,
    getAllJSON: Cookies.getJSON,
    remove: Cookies.remove,
  };

  return {
    consent: consent ?? EMPTY_CONSENT,
    acceptCookies,
    declineAllCookies,
    acceptAllCookies,
    cookies: cookieWrapper,
  };
};
