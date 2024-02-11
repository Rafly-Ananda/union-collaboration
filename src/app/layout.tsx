import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { Space_Grotesk } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

// NextAuth Client Session
import { getServerAuthSession } from "@/server/auth";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Union",
  description: "Elephant Union Marketplace",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${spaceGrotesk.variable}`}>
        <TRPCReactProvider>
          <Providers session={session}>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
