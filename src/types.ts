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

export interface CookieConsentHookActions {
  acceptCookies: (cookies: CookieTypes, options?: AcceptCookiesOptions) => void;
  declineAllCookies: () => void;
  acceptAllCookies: () => void;
  didAcceptAll: () => boolean;
  didDeclineAll: DidDeclineAllHandler;
  cookies: CookieWrapper;
}

export type CookieConsent = CookieTypes;

export interface CookieConsentHookState extends CookieConsentHookActions {
  consent: CookieConsent;
}

export interface CookieConsentOptions {
  defaultConsent?: CookieConsent;
  consentCookieAttributes?: CookieAttributes;
  localStorage?: boolean;
  sessionStorage?: boolean;
}

export interface AcceptCookiesOptions {
  allowChangingNecessary?: boolean;
}
