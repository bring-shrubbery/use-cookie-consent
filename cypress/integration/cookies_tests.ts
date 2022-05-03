import { useCookieConsent } from '../../src/useCookieConsent';
import { renderHook, act } from '@testing-library/react-hooks/dom';
import { COOKIE_CONSENT_KEY } from '../../src/constants';

describe('Cookie test', () => {
  it('should call useCookieConsent and check for default value', () => {
    renderHook(() => useCookieConsent());
    cy.getCookie(COOKIE_CONSENT_KEY).should(
      'have.property',
      'value',
      '{%22necessary%22:true}'
    );
  });

  it('should call cookie hook, then update cookie value', () => {
    const { result } = renderHook(() => useCookieConsent());
    cy.getCookie(COOKIE_CONSENT_KEY)
      .should('have.property', 'value', '{%22necessary%22:true}')
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
