// Cookie Types

import { CookieAttributes } from 'js-cookie';

export interface DurationCookieTypes {
  session?: boolean;
  persistent?: boolean;
}

export interface PurposeCookieTypes {
  necessary?: boolean;
  preferences?: boolean;
  statistics?: boolean;
  marketing?: boolean;
}

export interface ProvenanceCookieTypes {
  firstParty?: boolean;
  thirdParty?: boolean;
}

type CookieTypes = PurposeCookieTypes &
  DurationCookieTypes &
  ProvenanceCookieTypes;

export type AllCookieTypeKeys = keyof CookieTypes;

export type CookieDurationType = keyof DurationCookieTypes;
export type CookiePurposeType = keyof PurposeCookieTypes;
export type CookieProvenanceType = keyof ProvenanceCookieTypes;

// Other Types

export interface SetCookieProps {
  purpose: CookiePurposeType;
  duration: CookieDurationType;
  provenance: CookieProvenanceType;
}

export interface CookieWrapper {
  set: <T extends object = object>(
    name: string,
    value: string | T,
    props: SetCookieProps,
    options?: Cookies.CookieAttributes
  ) => string | undefined;
  get: (name: string) => string | undefined;
  getAll: () => Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getJSON: (name: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllJSON: () => Record<string, any>;
  remove: (name: string, options?: CookieAttributes) => void;
}

export type DidDeclineAllHandler = (opts?: {
  includingNecessary: boolean;
}) => boolean;

export interface ConsentHookActions {
  declineAllCookies: () => void;
  acceptAllCookies: () => void;
  didAcceptAll: () => boolean;
  didDeclineAll: DidDeclineAllHandler;
}

export type ConsentState = CookieTypes;

export interface CookieConsentHookState extends ConsentHookActions {
  acceptCookies: (cookies: CookieTypes, options?: AcceptCookiesOptions) => void;
  cookies?: CookieWrapper;
  consent: ConsentState;
}

export interface StorageConsentHookState extends ConsentHookActions {
  acceptCookies: (cookies: CookieTypes) => void;
  storage: Storage;
  consent: ConsentState;
}

export type UseCookieConsentHookType = (
  options?: CookieConsentOptionsCookie
) => CookieConsentHookState;

export type UseStorageConsentHookType = (
  options?: CookieConsentOptionsStorage
) => StorageConsentHookState;

export type UseConsentHookType =
  | UseCookieConsentHookType
  | UseStorageConsentHookType;

export interface CookieConsentOptionsCookie {
  defaultConsent?: ConsentState;
  consentCookieAttributes?: CookieAttributes;
}

export interface CookieConsentOptionsStorage {
  defaultConsent?: ConsentState;
  storage?: Storage;
}

export interface AcceptCookiesOptions {
  allowChangingNecessary?: boolean;
}
