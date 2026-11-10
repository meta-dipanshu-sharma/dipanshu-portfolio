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
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect, useRef } from 'react';
import { useTrackPageView } from './hooks/useApi';

function AppShell() {
  const tracked = useRef(false);

  const { mutate: trackPage } = useTrackPageView();
  // Lenis-powered smooth scroll (no-op for reduced-motion users).
  useSmoothScroll();

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackPage(window.location.pathname);
  }, []);

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
