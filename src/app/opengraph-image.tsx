import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'S77.AI — Intelligence Built In';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          padding: '60px',
        }}
      >
        {/* S77 Logo - rendered as text since SVG embedding is complex in Satori */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '160px',
              fontWeight: 200,
              color: '#F0F0F5',
              letterSpacing: '-0.02em',
              fontFamily: 'Inter',
            }}
          >
            S77
          </span>
          <span
            style={{
              fontSize: '160px',
              fontWeight: 200,
              color: '#6C63FF',
              fontFamily: 'Inter',
            }}
          >
            .
          </span>
          <span
            style={{
              fontSize: '120px',
              fontWeight: 200,
              color: '#6C63FF',
              fontFamily: 'Inter',
              marginLeft: '4px',
            }}
          >
            AI
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '32px',
            fontWeight: 300,
            color: '#A0A0A0',
            textAlign: 'center',
            margin: 0,
            fontFamily: 'Inter',
          }}
        >
          AI tools for creative companies.
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
