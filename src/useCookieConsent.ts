import { useState, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import { COOKIE_CONSENT_KEY, DEFAULT_CONSENT } from './constants';
import {
  UseConsentHookType,
  ConsentState,
  CookieWrapper,
  DidDeclineAllHandler,
  AcceptCookiesOptions,
} from './types';
import { allCookiesSetToValue, allPropsApproved } from './utils';

export const useCookieConsent: UseConsentHookType = (options) => {
  const doesStorageExist =
    typeof options !== 'undefined' && 'storage' in options;

  const storedConsent = doesStorageExist
    ? JSON.parse(options?.storage.getItem(COOKIE_CONSENT_KEY))
    : Cookies.getJSON(COOKIE_CONSENT_KEY);

  const initialConsent: ConsentState =
    storedConsent || options?.defaultConsent || DEFAULT_CONSENT;

  const [consent, setConsent] = useState<ConsentState>(initialConsent);

  useEffect(() => {
    if (!consent?.necessary) return;
    if (consent?.necessary && doesStorageExist) {
      options.storage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } else {
      Cookies.set(
        COOKIE_CONSENT_KEY,
        consent,
        options?.consentCookieAttributes
      );
    }
  }, [consent]);

  const acceptCookies = (
    newConsent: ConsentState,
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
    const keyArray = Object.keys(consent || {}) as (keyof ConsentState)[];

    return keyArray.reduce<boolean>(
      (prev, key) => (prev && consent && consent[key]) || false,
      true
    );
  };

  const didDeclineAll: DidDeclineAllHandler = (opts) => {
    const keyArray = Object.keys(consent || {}) as (keyof ConsentState)[];

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

  if (doesStorageExist) {
    return {
      consent,
      acceptCookies,
      declineAllCookies,
      acceptAllCookies,
      didAcceptAll,
      didDeclineAll,
      storage: options.storage,
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
