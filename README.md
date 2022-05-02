# useCookieConsent hook for pure JavaScript projects

[![Build](https://img.shields.io/github/checks-status/use-cookie-consent/use-cookie-consent-core/main?style=flat&colorA=5C5C5C&colorB=000000)](https://github.com/use-cookie-consent/use-cookie-consent-core/actions)
[![NPM Version](https://img.shields.io/npm/v/@use-cookie-consent/core?style=flat&colorA=5C5C5C&colorB=000000)](https://www.npmjs.com/package/@use-cookie-consent/core)
[![NPM Downloads](https://img.shields.io/npm/dm/@use-cookie-consent/core?style=flat&colorA=5C5C5C&colorB=000000)](https://www.npmjs.com/package/@use-cookie-consent/core)
[![Codecov](https://img.shields.io/codecov/c/github/use-cookie-consent/use-cookie-consent-core?style=flat&colorA=5C5C5C&colorB=000000)](https://github.com/use-cookie-consent/use-cookie-consent-core/actions/workflows/codecov.yml)
[![gzipped size](https://img.badgesize.io/https:/unpkg.com/@use-cookie-consent/core@latest/build/esm/index.js?label=gzipped&compression=gzip&style=flat&color=000000)](https://unpkg.com/@use-cookie-consent/core@latest/build/esm/index.js)
[![License](https://img.shields.io/npm/l/@use-cookie-consent/core?style=flat&colorA=5C5C5C&color=000000)](https://github.com/use-cookie-consent/use-cookie-consent-core/blob/main/LICENSE)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/bring.shrubbery)

> Headless state management for GDPR cookie consent

- **Headless** - bring your own styles, we will provide the logic.
- **Hook-based** - extremely intuitive for React developers, but can be used in any JavaScript application.
- **Small** - Less than `2kB` gzipped.

<p align="center">
<img src="https://user-images.githubusercontent.com/29360707/145967135-eafd0467-9dd4-4496-b5f6-df5e6c1f40ba.png" alt="carbon" width="700px" />
</p>

## Library-specific packages

This repo was made to be framework-agnostic, so you can use it in any JavaScript project. If you use a UI library that we support, you should use the package for your library for best experience

- [`@use-cookie-consent/react`](https://github.com/use-cookie-consent/use-cookie-consent-react)

## Description

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

Using `npm`:

```bash
npm i @use-cookie-consent/core
```

Using `yarn`:

```bash
yarn add @use-cookie-consent/core
```

## Usage in React

```tsx
import { useCookieConsent } from '@use-cookie-consent/core';

export const YourComponent = () => {
  const { consent, acceptAllCookies, declineAllCookies, acceptCookies } =
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
      <button onClick={() => acceptCookies({ necessary: true, thirdParty: true })}>
        Accept third-party
      </button>
      <button onClick={() => acceptCookies({ necessary: true, firstParty: true })}>
        Accept first-party
      </button>
      <button onClick={declineAllCookies}>Reject all</button>
    </div>
  );
};
```

### With custom cookie attributes
```tsx
import { useCookieConsent } from '@use-cookie-consent/core';

export const YourComponent = () => {
  const { consent, acceptAllCookies, declineAllCookies, acceptCookies } = useCookieConsent({ 
      consentCookieAttributes: { expires: 180  } // 180 days
    }); 

  return (
    // ...
  );
};
```

Cookie attributes for the underlying js-cookie package, more info [here](https://github.com/js-cookie/js-cookie).

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

- [ ] Monorepo
- [x] Add package bundler ([rollup](https://rollupjs.org/) was added)
- [ ] Add support for Storage API
- [ ] Add support for custom cookie categories
- [x] Create documentation website [here](https://use-cookie-consent.js.org/)
- [ ] Create supporting library packages
  - [x] React [here](https://github.com/use-cookie-consent/use-cookie-consent-react)
  - [ ] Vue (planned)
  - [ ] Svelte (planned)
- [ ] Change `CookiesWrapper` API to something that doesn't require a specific dependency (maybe just Storage API step?)

## Contributing

If you want to contribute to this project, read our [contributing guidelines](https://github.com/use-cookie-consent/use-cookie-consent/blob/main/CONTRIBUTING.md) first.

## Acknowledgements

Following package was used as a starter for this project:

- [easy-npm-package-react](https://github.com/bring-shrubbery/easy-npm-package-react)

## Discussions and Questions

For non-issues please consider joining our Discord [here](https://discord.gg/pa8epvzJbb)!

## Contributors

- [Antoni Silvestrovic (author)](https://github.com/bring-shrubbery)

## License

[MIT](https://github.com/bring-shrubbery/use-cookie-consent/blob/master/LICENSE)
