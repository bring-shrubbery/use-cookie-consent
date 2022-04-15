import { useState, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import { COOKIE_CONSENT_KEY, DEFAULT_CONSENT } from './constants';
import {
  CookieConsent,
  CookieConsentHookState,
  CookieConsentOptions,
  CookieWrapper,
  DidDeclineAllHandler,
  AcceptCookiesOptions,
} from './types';
import { allCookiesSetToValue, allPropsApproved } from './utils';

export const useCookieConsent = (
  options?: CookieConsentOptions
): CookieConsentHookState => {
  const storedConsent =
    typeof options !== 'undefined' && 'storage' in options
      ? JSON.parse(options?.storage.getItem(COOKIE_CONSENT_KEY))
      : Cookies.getJSON(COOKIE_CONSENT_KEY);

  const initialConsent: CookieConsent =
    storedConsent || options?.defaultConsent || DEFAULT_CONSENT;

  const [consent, setConsent] = useState<CookieConsent>(initialConsent);

  useEffect(() => {
    if (consent?.necessary) {
      if (typeof options !== 'undefined' && 'storage' in options) {
        options.storage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
      }
      if (
        typeof options === 'undefined' ||
        'consentCookieAttributes' in options
      ) {
        Cookies.set(
          COOKIE_CONSENT_KEY,
          consent,
          options?.consentCookieAttributes
        );
      }
    }
  }, [consent]);

  const acceptCookies = (
    newConsent: CookieConsent,
    options?: AcceptCookiesOptions
  ) => {
    if (options?.allowChangingNecessary) {
      setConsent(newConsent);
    } else {
      setConsent({ ...newConsent, necessary: true });
    }
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

  if (typeof options !== 'undefined' && 'storage' in options) {
    const storageWrapper = {
      clear: options.storage.clear,
      getItem: options.storage.getItem,
      key: options.storage.key,
      length: options.storage.length,
      removeItem: options.storage.removeItem,
      setItem: options.storage.setItem,
    };
    return {
      consent,
      acceptCookies,
      declineAllCookies,
      acceptAllCookies,
      didAcceptAll,
      didDeclineAll,
      cookies: storageWrapper,
    };
  }

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
