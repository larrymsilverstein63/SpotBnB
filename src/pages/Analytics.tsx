import { useEffect, useRef } from 'react';
import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk';
import { AIRBNB_LIVEBOARD_ID } from '../lib/thoughtspot';

export default function Analytics() {
  const embedRef = useRef<HTMLDivElement>(null);
  const embedInstanceRef = useRef<LiveboardEmbed | null>(null);

  useEffect(() => {
    if (embedRef.current && !embedInstanceRef.current) {
      const embed = new LiveboardEmbed(embedRef.current, {
        frameParams: { width: '100%', height: '100%' },
        liveboardId: AIRBNB_LIVEBOARD_ID,
        hideLiveboardHeader: false,
        showLiveboardTitle: true,
        showLiveboardDescription: true,
        isLiveboardStylingAndGroupingEnabled: true,
        customizations: {
          style: {
            customCSS: {
              variables: {
                '--ts-var-root-background': 'transparent',
                '--ts-var-viz-background': '#ffffff',
                '--ts-var-button--primary-background': '#FF385C',
                '--ts-var-button--primary-color': '#ffffff',
                '--ts-var-button--primary--hover-background': '#E31C5F',
                '--ts-var-root-color': '#222222',
                '--ts-var-link-color': '#FF385C',
              } as any,
              rules_UNSTABLE: {
                '.footer-module__footerLogo': { display: 'none !important' },
                '.footer-module__footer': { display: 'none !important' },
                "[class*='footer-module']": { display: 'none !important' },
                body: { backgroundColor: 'transparent !important' },
                '.pinboard-background': { backgroundColor: 'transparent !important' },
                "[class*='aiHighlight'],[class*='ai-highlight'],[class*='AiHighlight']": {
                  backgroundColor: '#FF385C !important',
                  color: '#ffffff !important',
                  borderColor: '#FF385C !important',
                },
                "[class*='aiHighlight']:hover,[class*='ai-highlight']:hover": {
                  backgroundColor: '#E31C5F !important',
                  borderColor: '#E31C5F !important',
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
      <div className="embed-page-hero">
        <div className="embed-page-hero-text">
          <h2 className="embed-page-title">Analytics</h2>
          <p className="embed-page-subtitle">
            Booking trends, revenue insights, and property performance — powered by ThoughtSpot
          </p>
        </div>
      </div>
      <div className="embed-container" ref={embedRef}>
        <div className="embed-loading">
          <div className="embed-spinner" />
          <span>Loading Analytics…</span>
        </div>
      </div>
    </div>
  );
}
