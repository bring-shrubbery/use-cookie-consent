import {useState, useEffect} from 'react';
import * as Cookies from 'js-cookie';
import {COOKIE_CONSENT_KEY, EMPTY_CONSENT} from './constants';
import {
  CookieConsent,
  CookieConsentHookState,
  CookieConsentOptions,
  CookieWrapper,
  DidDeclineAllHandler,
} from './types';
import {allCookiesSetToValue, allPropsApproved} from './utils';

export const useCookieConsent = (
  options?: CookieConsentOptions
): CookieConsentHookState => {
  const initialConsent: CookieConsent =
    Cookies.getJSON(COOKIE_CONSENT_KEY) ?? EMPTY_CONSENT;

  const [consent, setConsent] = useState<CookieConsent | undefined>(
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

  const acceptCookies = (newConsent: CookieConsent) => {
    setConsent(newConsent);
  };

  const declineAllCookies = () => {
    setConsent(allCookiesSetToValue(false));
  };

  const acceptAllCookies = () => {
    setConsent(allCookiesSetToValue(true));
  };

  const didAcceptAll = (): boolean => {
    const consentKeyArray = Object.keys(consent) as (keyof CookieConsent)[];

    return consentKeyArray.reduce<boolean>((prev, key) => {
      return prev && consent[key];
    }, true);
  };

  const didDeclineAll: DidDeclineAllHandler = opts => {
    const consentKeyArray = Object.keys(consent) as (keyof CookieConsent)[];

    return consentKeyArray.reduce<boolean>((prev, key) => {
      if (!opts?.includingNecessary && key === 'necessary') return prev;
      return prev && !consent[key];
    }, true);
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
    consent: consent,
    acceptCookies,
    declineAllCookies,
    acceptAllCookies,
    didAcceptAll,
    didDeclineAll,
    cookies: cookieWrapper,
  };
};
