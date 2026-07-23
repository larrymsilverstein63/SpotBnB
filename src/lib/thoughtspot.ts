import { init, AuthType } from '@thoughtspot/visual-embed-sdk';

export const THOUGHTSPOT_HOST = 'https://se-thoughtspot-cloud.thoughtspot.cloud';
export const AIRBNB_LIVEBOARD_ID = 'd5a71e60-4d45-449f-924d-e1b454f57abc';
export const AIRBNB_WORKSHEET_ID = '35aad505-4f21-4d4e-a6e5-a153338691d4';

const FOOTER_HIDE_CSS = {
  '.footer-module__footerLogo': { display: 'none !important' },
  '.footer-module__footer': { display: 'none !important' },
  "[class*='footer-module']": { display: 'none !important' },
};

export function initThoughtSpot(username: string, password: string) {
  init({
    thoughtSpotHost: THOUGHTSPOT_HOST,
    authType: AuthType.Basic,
    username,
    password,
    customizations: {
      style: {
        customCSS: {
          rules_UNSTABLE: FOOTER_HIDE_CSS,
        },
      },
    },
  });
}
