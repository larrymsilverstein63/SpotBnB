import { useEffect, useRef } from 'react';
import { SpotterEmbed } from '@thoughtspot/visual-embed-sdk';
import { AIRBNB_WORKSHEET_ID } from '../lib/thoughtspot';

export default function SpotterPage() {
  const embedRef = useRef<HTMLDivElement>(null);
  const embedInstanceRef = useRef<SpotterEmbed | null>(null);

  useEffect(() => {
    if (embedRef.current && !embedInstanceRef.current) {
      const embed = new SpotterEmbed(embedRef.current, {
        frameParams: { width: '100%', height: '100%' },
        worksheetId: AIRBNB_WORKSHEET_ID,
        updatedSpotterChatPrompt: true,
        customizations: {
          style: {
            customCSS: {
              rules_UNSTABLE: {
                '.footer-module__footerLogo': { display: 'none !important' },
                '.footer-module__footer': { display: 'none !important' },
                "[class*='footer-module']": { display: 'none !important' },
                // Airbnb brand colors
                "[class*='btn-primary'],[class*='primaryButton'],[class*='primary-button']": {
                  backgroundColor: '#FF385C !important',
                  borderColor: '#FF385C !important',
                  color: '#ffffff !important',
                },
                // Override greeting: make original text invisible, overlay new text via ::after
                '.typography-module__headline-large.typography-module__base.typography-module__whiteSpace': {
                  color: 'transparent !important',
                  position: 'relative !important',
                },
                '.typography-module__headline-large.typography-module__base.typography-module__whiteSpace::after': {
                  content: '"Hi! I\'m AI-rbnb, your AI data analyst"',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  color: '#222222',
                  whiteSpace: 'normal',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  fontFamily: 'inherit',
                },
                // Hide Spotter dog — display:none is reliable (same pattern as footer rules)
                "[class*='landingPageIcon']": {
                  display: 'none !important',
                },
              },
            },
          },
        },
      });
      embedInstanceRef.current = embed;
      embed.render();
    }
    return () => {
      embedInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="embed-page">
      <div className="embed-page-hero embed-page-hero--ai">
        <div className="embed-page-hero-text">
          <h2 className="embed-page-title">AI-rbnb</h2>
          <p className="embed-page-subtitle">
            Ask questions about your listings, bookings, and guests in plain English
          </p>
        </div>
      </div>
      <div className="embed-container" ref={embedRef}>
        <div className="embed-loading">
          <div className="embed-spinner" />
          <span>Loading AI-rbnb…</span>
        </div>
      </div>
    </div>
  );
}
