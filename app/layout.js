import { Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({ subsets: ['latin'], weight: ['300','400','500','600','700','800'], variable: '--font-sora', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-jetbrains', display: 'swap' });

export const metadata = {
  title: 'Tech Stack Colombia S.A.S. — Software a medida para empresas',
  description: 'Empresa colombiana de desarrollo de software especializada en sistemas ERP, POS, facturación electrónica DIAN y plataformas digitales a medida. Producto estrella: Ksmart360.',
  keywords: ['desarrollo de software Colombia','ERP Colombia','POS Colombia','facturación electrónica DIAN','Ksmart360','Tech Stack Colombia'],
  authors: [{ name: 'Tech Stack Colombia S.A.S.' }],
  openGraph: { title: 'Tech Stack Colombia S.A.S.', description: 'Soluciones tecnológicas a medida para empresas colombianas.', type: 'website', locale: 'es_CO' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sora antialiased bg-papel text-grafito">{children}</body>
    </html>
  );
}
