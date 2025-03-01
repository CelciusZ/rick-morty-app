'use client'; // Tüm uygulama client-side olacak (zorunlu değil, ama nuqs ve react-query için)

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// QueryClient oluştur
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryClientProvider>
      </body>
    </html>
  );
}