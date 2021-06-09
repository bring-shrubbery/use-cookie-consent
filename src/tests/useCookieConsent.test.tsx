import {renderHook, act} from '@testing-library/react-hooks';
import {useCookieConsent} from '../useCookieConsent';

test('should accept all cookies', async () => {
  const {result} = renderHook(() => useCookieConsent());

  act(() => result.current.acceptAllCookies());

  expect(result.current.didAcceptAll()).toBeTruthy();
  expect(result.current.didDeclineAll()).toBeFalsy();
});

test('should decline all cookies', async () => {
  const {result} = renderHook(() => useCookieConsent());

  act(() => result.current.declineAllCookies());

  expect(result.current.didDeclineAll()).toBeTruthy();
  expect(result.current.didAcceptAll()).toBeFalsy();
});
