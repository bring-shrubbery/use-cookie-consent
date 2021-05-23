import {CookieTypes, SetCookieProps} from './types';

export const allCookiesSetToValue = (
  value: boolean
): Required<CookieTypes> => ({
  session: value,
  persistent: value,
  necessary: true, // Necessary cookies are necessary, thus should stay active.
  preferences: value,
  statistics: value,
  marketing: value,
  firstParty: value,
  thirdParty: value,
});

export const allPropsApproved = (
  props: SetCookieProps,
  consent?: CookieTypes
): boolean => {
  if (!consent) return false;
  if (!consent[props.duration]) return false;
  if (!consent[props.provenance]) return false;
  if (!consent[props.purpose]) return false;
  return true;
};
