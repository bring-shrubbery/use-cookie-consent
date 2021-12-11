import { useState, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import { COOKIE_CONSENT_KEY, EMPTY_CONSENT } from './constants';
import {
  CookieConsent,
  CookieConsentHookState,
  CookieConsentOptions,
  CookieWrapper,
  DidDeclineAllHandler,
} from './types';
import { allCookiesSetToValue, allPropsApproved } from './utils';

export const useCookieConsent = (
  options?: CookieConsentOptions
): CookieConsentHookState => {
  const initialConsent: CookieConsent =
    Cookies.getJSON(COOKIE_CONSENT_KEY) ||
    options?.defaultConsent ||
    EMPTY_CONSENT;

  const [consent, setConsent] = useState<CookieConsent>(initialConsent);

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
    const keyArray = Object.keys(consent || {}) as (keyof CookieConsent)[];

    return keyArray.reduce<boolean>(
      (prev, key) => (prev && consent && consent[key]) || false,
      true
    );
  };

  const didDeclineAll: DidDeclineAllHandler = (opts) => {
    const keyArray = Object.keys(consent || {}) as (keyof CookieConsent)[];

    return keyArray.reduce<boolean>((prev, key): boolean => {
      if (!opts?.includingNecessary && key === 'necessary') return prev;
      return (prev && consent && !consent[key]) || false;
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
    consent,
    acceptCookies,
    declineAllCookies,
    acceptAllCookies,
    didAcceptAll,
    didDeclineAll,
    cookies: cookieWrapper,
  };
};
