import localFont from "next/font/local";
import Link from "next/link";

import { Divider, Center } from "@chakra-ui/react";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default async function LinkCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 ">
        <h1 className={`${graphik.className} text-5xl font-bold`}>Checker</h1>

        <p className="w-[80%] text-center opacity-50">
          Link Checker can be used to check the website you are opening. Those
          websites which had been registered in Algorand database is trusted and
          save to visit.
        </p>
      </div>

      {children}

      {/* Get Extensions */}
      <div className="mt-5 flex h-fit w-full items-center justify-center gap-4">
        <h4>Get Extesions</h4>

        <button className="rounded-md border border-gray-500 bg-white px-5 py-2 font-bold">
          Download Browser Extension
        </button>

        <Center height="50px">
          <Divider orientation="vertical" borderColor="black" />
        </Center>

        <Link href="/home/checker">
          <button className="rounded-md border border-gray-500 bg-white px-5 py-2 font-bold">
            Check Another Link
          </button>
        </Link>

        <button className="rounded-md border border-gray-500 bg-white px-5 py-2 font-bold">
          How This Works
        </button>
      </div>
    </div>
  );
}
