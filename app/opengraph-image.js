import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tech Stack Colombia S.A.S. — Software a medida para empresas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#16181F',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(46,104,230,0.15)',
            filter: 'blur(80px)',
          }}
        />

        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#2E68E6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '14px',
              gap: '6px',
            }}
          >
            <div style={{ width: '36px', height: '8px', borderRadius: '4px', background: 'white' }} />
            <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.7)' }} />
            <div style={{ width: '20px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.5)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              Tech Stack
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', letterSpacing: '3px' }}>
              COLOMBIA S.A.S.
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: 'white',
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: 1.1,
            margin: '0 0 24px',
            maxWidth: '800px',
            letterSpacing: '-1px',
          }}
        >
          Software que{' '}
          <span style={{ color: '#2E68E6' }}>impulsa tu negocio</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '22px', margin: '0 0 48px', maxWidth: '700px', lineHeight: 1.5 }}>
          Soluciones tecnológicas a medida para empresas colombianas. ERP, POS, facturación DIAN y más.
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Ksmart360 ERP', 'FastAPI + React', 'Oracle Cloud'].map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(46,104,230,0.2)',
                border: '1px solid rgba(46,104,230,0.4)',
                color: '#2E68E6',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '16px',
            fontFamily: 'monospace',
          }}
        >
          techstackcol.com
        </div>
      </div>
    ),
    { ...size }
  );
}
