"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ChakraProvider>
  );
}
