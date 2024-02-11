"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";

import type { Session } from "next-auth";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <TRPCReactProvider>
      <ChakraProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ChakraProvider>
    </TRPCReactProvider>
  );
}
