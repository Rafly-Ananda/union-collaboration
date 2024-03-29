"use client";
import { api } from "@/trpc/react";
import Image from "next/image";
import checkerSuccessAva from "../../../../public/assets/link_checker_success.png";
import checkerSuccessCopy from "../../../../public/assets/link_checker_yay.png";
import checkerFaileAva from "../../../../public/assets/link_checker_failed.png";
import checkerFailedCopy from "../../../../public/assets/link_checker_wait.png";
import { usePathname } from "next/navigation";

export default function CheckerResult() {
  const pathName = usePathname();
  const link = pathName.split("/").at(-1);

  const { data, isLoading } = api.user.getSingleVerifiedLink.useQuery({
    url: link,
  });

  return (
    <section className="mt-5 flex h-fit w-[822px] flex-col items-center justify-center gap-4 ">
      {!isLoading && (
        <>
          {data && data !== null ? (
            <div className="flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-[#e2e0d6] p-10">
              <h1 className="text-3xl font-bold">{link}</h1>
              <Image
                unoptimized={true}
                src={checkerSuccessAva}
                alt="checker success ava"
              />
              <Image
                unoptimized={true}
                src={checkerSuccessCopy}
                alt="checker success coppy"
              />

              <div className="rounded-md bg-[#c2d0c1] p-5">
                <p className="text-[#43936C]">
                  This url is listed in our database. This means that the
                  developer of the project has registered their links to this
                  system
                </p>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-[#e2e0d6] p-10">
              <h1 className="text-3xl font-bold">{link}</h1>
              <Image
                unoptimized={true}
                src={checkerFaileAva}
                alt="checker failed ava"
              />
              <Image
                unoptimized={true}
                src={checkerFailedCopy}
                alt="checker failed coppy"
              />

              <div className="flex w-full flex-col items-center justify-center rounded-md bg-[#debfb5] p-5">
                <p className="text-[#CB3A31]">
                  This url is not listed in our database. This could mean two
                  things:
                </p>
                <ul>
                  <li>
                    <p>
                      1. Either the project has not validated their link to this
                      system
                    </p>
                  </li>
                  <li>
                    <p>2. Or, this might be a scam website!</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
