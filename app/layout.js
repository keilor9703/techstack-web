import { Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: 'Tech Stack Colombia S.A.S. — Software a medida para empresas',
  description:
    'Empresa colombiana de desarrollo de software especializada en sistemas ERP, POS, facturación electrónica DIAN y plataformas digitales a medida. Producto estrella: Ksmart360.',
  keywords: [
    'desarrollo de software Colombia',
    'ERP Colombia',
    'POS Colombia',
    'facturación electrónica DIAN',
    'Ksmart360',
    'Tech Stack Colombia',
    'software a medida Cali',
    'ERP Cali Colombia',
  ],
  authors: [{ name: 'Tech Stack Colombia S.A.S.' }],
  metadataBase: new URL('https://www.techstackcol.com'),
  openGraph: {
    title: 'Tech Stack Colombia S.A.S. — Software que impulsa tu negocio',
    description: 'Construimos software a medida y Ksmart360, nuestro ERP & POS. Más de 30 empresas colombianas ya digitalizaron su operación con nosotros.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.techstackcol.com',
    siteName: 'Tech Stack Colombia',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Tech Stack Colombia S.A.S. — Software a medida para empresas colombianas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack Colombia S.A.S. — Software que impulsa tu negocio',
    description: 'Construimos software a medida y Ksmart360, nuestro ERP & POS. Más de 30 empresas colombianas ya digitalizaron su operación con nosotros.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sora antialiased bg-papel text-grafito">{children}</body>
    </html>
  );
}
