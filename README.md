# useCookieConsent

## Disclaimer

Although code in this repository is oriented to satisfy GDPR cookie rules, neither author nor contributors to this repository will be responsible for any non-compliance with the law. Please make sure that this repository provides all the functionality to satisfy requirements for your project. If you find something that can be improved please create an issue or send a PR with your fixes!

## Description

This React hook is made to make managing cookie consent state easier in a the React hook world. It is following [this](https://gdpr.eu/cookies) GDPR cookie guide which describes what you need for GDPR compliance. This hook mainly focuses handling the consent state of the different types of cookies as described in "Types of Cookies" in [this](https://gdpr.eu/cookies) page. Summarizing the mentioned document, there are three different ways to classify cookies:

- Cookie Duration
  - Session cookies
  - Persistent cookies
- Cookie Provenance
  - First-party cookies
  - Third-party cookies
- Cookie Purpose
  - Strictly necessary cookies
  - Preferences cookies
  - Statistics cookies
  - Marketing cookies

The hook in this repository will provide a way to manage these types of cookies.

## Usage

```tsx
import {useCookieConsent} from 'use-cookie-consent';

export const YourComponent = () => {
  const {consent, acceptAllCookies, declineAllCookies, acceptCookies} =
    useCookieConsent();

  return (
    <div>
      <h3>
        {`Third-party cookies ${consent.thirdParty ? 'approved' : 'rejected'}`}
      </h3>
      <h3>
        {`First-party cookies ${consent.firstParty ? 'approved' : 'rejected'}`}
      </h3>

      <button onClick={acceptAllCookies}>Accept all</button>
      <button onClick={() => acceptCookies({thirdParty: true})}>
        Accept third-party
      </button>
      <button onClick={() => acceptCookies({firstParty: true})}>
        Accept first-party
      </button>
      <button onClick={declineAllCookies}>Reject all</button>
    </div>
  );
};
```

## Author

[Antoni Silvestrovic](https://github.com/bring-shrubbery)

## License

[MIT](https://github.com/bring-shrubbery/use-cookie-consent/blob/master/LICENSE)
