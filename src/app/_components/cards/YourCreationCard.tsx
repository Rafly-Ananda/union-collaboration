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
import notFound from "../../../../public/assets/not_found.png";
import { Project } from "@/server/validator";
import ProjectStatusBadge from "../badges/ProjectStatus";
import { useState, useEffect } from "react";

export default function YourCreationCard({ project }: { project: Project }) {
  const [isImageError, setIsImageError] = useState<boolean>(false);

  useEffect(() => {
    setIsImageError(false);
  }, []);

  return (
    <div className="my-5 flex w-full items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-2">
      <div className="skeleton relative h-32 w-40 rounded-md">
        <Image
          src={isImageError ? notFound : project?.logo_url!}
          width={300}
          height={300}
          alt="project logo"
          className="absolute h-full w-full rounded-md object-fill"
          onError={() => setIsImageError(true)}
          blurDataURL="../../../../public/assets/not_found.png"
          placeholder="blur"
        />
      </div>
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center gap-2">
          <h1 className="text-lg font-bold">{project.project_name}</h1>
          <ProjectStatusBadge projectStatus={project.status} />
        </div>
        <p className="text-xs font-light">{project.description}</p>
        <div className="mt-5">
          <ul className="flex items-center justify-start gap-4">
            <li>
              <a href={`https://${project.twitter}`}>
                <FaXTwitter color="#C2C2C2" />
              </a>
            </li>
            <li>
              <a href={`https://${project.discord}`}>
                <FaDiscord color="#C2C2C2" />
              </a>
            </li>
            <li>
              <a href={`https://${project.website}`}>
                <FaGlobe color="#C2C2C2" />
              </a>
            </li>
          </ul>

          <div className="mt-3 flex w-full items-center gap-4">
            {/* Details */}
            <Link href={`/home/dashboard/your-creation/${project.id}`}>
              <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#3182CE] p-2 text-sm font-semibold text-[#3182CE] hover:bg-[#3182CE] hover:text-white">
                <FaInfo />
                Details
              </button>
            </Link>
            {/* Incoming Request Link */}
            <Link
              href={`/home/dashboard/your-creation/${project.id}/incoming-request`}
            >
              <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#319795] p-2 text-sm font-semibold text-[#319795] hover:bg-[#319795] hover:text-white">
                <FaAnglesRight />
                Incoming Request
              </button>
            </Link>
            {/* Request Sent Link */}
            <Link
              href={`/home/dashboard/your-creation/${project.id}/request-sent`}
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
