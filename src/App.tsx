import { DevModeProvider } from '@/context/DevModeContext';
import { Navigation } from '@components/Navigation';
import { DevConsole } from '@components/DevConsole';
import { Footer } from '@components/Footer';
import { Hero } from '@sections/Hero';
import { Experience } from '@sections/Experience';
import { Stack } from '@sections/Stack';
import { Contact } from '@sections/Contact';
import { ChatBot } from '@components/ChatBot';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function AppShell() {
  // Lenis-powered smooth scroll (no-op for reduced-motion users).
  useSmoothScroll();

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <DevConsole />
      <ChatBot />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default function App() {
  return (
    <DevModeProvider>
      <AppShell />
    </DevModeProvider>
  );
}
