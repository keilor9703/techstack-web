import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Clients = dynamic(() => import('@/components/Clients'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Ksmart360Feature = dynamic(() => import('@/components/Ksmart360Feature'), { ssr: false });
const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Ksmart360Feature />
      <Clients />
      <Portfolio />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
