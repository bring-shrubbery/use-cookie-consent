import React from 'react';
import { useCookieConsent } from '../useCookieConsent';

export const CookieConsent = (storageProp) => {
  const storageType = storageProp.local
    ? { storage: localStorage }
    : storageProp.session
    ? { storage: sessionStorage }
    : undefined;
  const { consent, acceptAllCookies, declineAllCookies, acceptCookies } =
    useCookieConsent(storageType);

  return (
    <div>
      <h3>
        {`Third-party cookies ${consent.thirdParty ? 'approved' : 'rejected'}`}
      </h3>
      <h3>
        {`First-party cookies ${consent.firstParty ? 'approved' : 'rejected'}`}
      </h3>

      <button onClick={acceptAllCookies}>Accept all</button>
      <button
        onClick={() => acceptCookies({ necessary: true, thirdParty: true })}
      >
        Accept third-party
      </button>
      <button
        onClick={() => acceptCookies({ necessary: true, firstParty: true })}
      >
        Accept first-party
      </button>
      <button onClick={declineAllCookies}>Reject all</button>
    </div>
  );
};
