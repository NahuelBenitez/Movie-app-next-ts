"use client"

import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '@/components/Home';

// Crea una instancia de QueryClient
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default MyApp;
