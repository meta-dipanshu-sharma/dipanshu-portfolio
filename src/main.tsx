import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import '@styles/index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 minutes — analytics data doesn't need to be real-time
      retry: 2,                    // retry failed requests twice
      refetchOnWindowFocus: false, // don't refetch just because user switched tabs
    },
    mutations: {
      retry: 1,
    },
  },
});


const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found.');
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
