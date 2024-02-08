"use client";
import Image from "next/image";
import {
  FaXTwitter,
  FaDiscord,
  FaGlobe,
  FaAnglesRight,
  FaInfo,
} from "react-icons/fa6";
import { RxPaperPlane } from "react-icons/rx";

import Link from "next/link";

import deleteMeLater from "../../../../public/assets/delete_me_later.png";

export default function YourCreationCard({ projectId }: { projectId: string }) {
  return (
    <div className="my-5 flex w-full items-start justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-2">
      <div>
        <Image src={deleteMeLater} alt="xoxo" className="w-32 rounded-md" />
      </div>
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center gap-2">
          <h1 className="text-lg font-bold">Zeels Den</h1>
          <span className="rounded-md bg-[#DD6B20] p-1 text-xs font-medium uppercase text-white">
            pending
          </span>
        </div>
        <p className="text-xs font-light">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit
        </p>
        <div className="mt-5">
          <ul className="flex items-center justify-start gap-4">
            <li>
              <a href="www.twitter.com">
                <FaXTwitter color="#C2C2C2" />
              </a>
            </li>
            <li>
              <a href="www.discord.com">
                <FaDiscord color="#C2C2C2" />
              </a>
            </li>
            <li>
              <a href="www.google.com">
                <FaGlobe color="#C2C2C2" />
              </a>
            </li>
          </ul>

          <div className="mt-3 flex w-full items-center gap-4">
            {/* Details */}
            <Link href={`/home/dashboard/your-creation/${projectId}`}>
              <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#3182CE] p-2 text-sm font-semibold text-[#3182CE] hover:bg-[#3182CE] hover:text-white">
                <FaInfo />
                Details
              </button>
            </Link>
            {/* Incoming Request Link */}
            <Link
              href={`/home/dashboard/your-creation/${projectId}/incoming-request`}
            >
              <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#319795] p-2 text-sm font-semibold text-[#319795] hover:bg-[#319795] hover:text-white">
                <FaAnglesRight />
                Incoming Request
              </button>
            </Link>
            {/* Request Sent Link */}
            <Link
              href={`/home/dashboard/your-creation/${projectId}/request-sent`}
            >
              <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#F2994A] p-2 text-sm font-semibold text-[#F2994A] hover:bg-[#F2994A] hover:text-white">
                <RxPaperPlane />
                Request Sent
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
