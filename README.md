# use-cookie-consent-core

[![Build](https://img.shields.io/github/checks-status/use-cookie-consent/use-cookie-consent-core/main)](https://github.com/use-cookie-consent/use-cookie-consent-core/actions)
[![NPM Version](https://img.shields.io/npm/v/@use-cookie-consent/core)](https://www.npmjs.com/package/@use-cookie-consent/core)
[![NPM Downloads](https://img.shields.io/npm/dm/@use-cookie-consent/core)](https://www.npmjs.com/package/@use-cookie-consent/core)
[![Codecov](https://img.shields.io/codecov/c/github/use-cookie-consent/use-cookie-consent-core)](https://github.com/use-cookie-consent/use-cookie-consent-core/actions/workflows/codecov.yml)
![Lines of code](https://img.shields.io/tokei/lines/github/use-cookie-consent/use-cookie-consent-core)
[![License](https://img.shields.io/npm/l/@use-cookie-consent/core)](https://github.com/use-cookie-consent/use-cookie-consent-core/blob/main/LICENSE)

> :warning: **This repository was transferred**: As part of the roadmap for a major release, the repository was transferred to an organisation for easier scoping or library specific packages.

## Disclaimer

Although code in this repository is oriented to satisfy GDPR cookie rules, neither author nor contributors to this repository will be responsible for any non-compliance with the law. Please make sure that this repository provides all the functionality to satisfy requirements for your project. If you find something that can be improved please create an issue or send a PR with your fixes!

## Description

This hook is made to make managing cookie consent state easier. Although it might seem like a React thing, it's framework agnostic, and if you want to have best experience with React.js you should use [this (not yet finished)](https://github.com/use-cookie-consent/use-cookie-consent-react) package.

This package is following [this](https://gdpr.eu/cookies) GDPR cookie guide which describes what you need for GDPR compliance. This hook mainly focuses handling the consent state of the different types of cookies as described in "Types of Cookies" in [this](https://gdpr.eu/cookies) page. Summarizing the mentioned document, there are three different ways to classify cookies:

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

## Installation

This package can be easily installed using `npm`:

```bash
npm i @use-cookie-consent/core
```

Or `yarn`:

```bash
yarn add @use-cookie-consent/core
```

## Usage in React

```tsx
import {useCookieConsent} from '@use-cookie-consent/core';

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

## API

### `useCookieConsent(options)`

`useCookieConsent` is the main hook in this library. You call it whenever you need to accept, decline, set or get cookies - so anything to do with cookies.

```ts
useCookieConsent({
  defaultConsent?: CookieConsent,
  consentCookieAttributes?: CookieAttributes;
})
```

This hook function returns following object:

```ts
{
  consent: {
    session?: boolean;
    persistent?: boolean;
    necessary?: boolean;
    preferences?: boolean;
    statistics?: boolean;
    marketing?: boolean;
    firstParty?: boolean;
    thirdParty?: boolean;
  };
  acceptCookies: (cookies: CookieTypes) => void;
  declineAllCookies: () => void;
  acceptAllCookies: () => void;
  didAcceptAll: () => boolean;
  didDeclineAll: (opts?: CookieDeclineOptions) => boolean;
  cookies: CookieWrapper;
}
```

## Roadmap to v1

- [ ] Add package bundler ([webpack](https://webpack.js.org/) or [rollup](https://rollupjs.org/)).
- [ ] Add support for Storage API.
- [ ] Add support for custom cookie categories.
- [ ] Create documentation website.
- [ ] Create supporting library packages.
- [ ] Change `CookiesWrapper` API to something that doesn't require a specific dependency (maybe just Storage API step?).

## Acknowledgements

Following package was used as a starter for this project:

- [easy-npm-package-react](https://github.com/bring-shrubbery/easy-npm-package-react)

## Contributors

- [Antoni Silvestrovic (author)](https://github.com/bring-shrubbery)

## License

[MIT](https://github.com/bring-shrubbery/use-cookie-consent/blob/master/LICENSE)
