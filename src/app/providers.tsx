"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{children}</NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
