import { useCookieConsent } from '../../src/useCookieConsent';
import { renderHook, act } from '@testing-library/react-hooks/dom';
import { COOKIE_CONSENT_KEY } from '../../src/constants';
import { expect } from 'chai';

describe('Cookie test', () => {
  it('should call useCookieConsent and check if cookie exists', () => {
    renderHook(() => useCookieConsent());
    expect(cy.getCookie(COOKIE_CONSENT_KEY)).to.exist;
  });
  it('should fail', () => {
    renderHook(() => useCookieConsent());
    expect(cy.getCookie(COOKIE_CONSENT_KEY)).to.not.exist;
  });

  it('should call cookie hook, then update cookie value', () => {
    const { result } = renderHook(() => useCookieConsent());
    cy.getCookie(COOKIE_CONSENT_KEY)
      .then(() => {
        act(() => result.current.acceptCookies({ persistent: true }));
      })
      .then(() => {
        cy.getCookie(COOKIE_CONSENT_KEY).should(
          'have.property',
          'value',
          '{%22persistent%22:true%2C%22necessary%22:true}'
        );
      });
  });
});
