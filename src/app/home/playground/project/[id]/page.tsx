"use client";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { FaXTwitter, FaDiscord, FaGlobe } from "react-icons/fa6";

import deleteMeLater from "../../../../../../public/assets/delete_me_later.png";

import { dateFormatter } from "@/app/_utils/dateFormatter";

// Icons
import supplyIcon from "../../../../../../public/assets/supply_icon.png";
import mintDateIcon from "../../../../../../public/assets/mint_date_icon.png";
import wlSlotIcon from "../../../../../../public/assets/wl_slot_icon.png";

export default function ProjectViewer() {
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-1);

  const { data } = api.project.get.useQuery({ projectId: projectId! });

  return (
    <div>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/playground">Playground</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{data?.project_name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex items-center  justify-between">
        {/* Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">{data?.project_name}</h1>
        </div>

        {/* Project Actions */}
        <div className="flex items-center gap-4">
          <Link href={`/home/playground/project/${projectId}/collab`}>
            <button className="rounded-md bg-black px-4 py-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
              Collabs
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex items-start gap-4">
        <div className="rounded-md bg-white">
          <Image src={deleteMeLater} alt="xoxo" className="w-60 rounded-t-md" />
          <div className="p-2">
            <h1 className="mb-2 text-center font-bold">{data?.project_name}</h1>
            <Divider />
            <ul className="mt-2 flex items-center justify-center gap-4">
              <li>
                <a href={data?.twitter}>
                  <FaXTwitter color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={data?.discord}>
                  <FaDiscord color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={data?.website}>
                  <FaGlobe color="#C2C2C2" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-full w-full grow rounded-md bg-white p-5">
          <h1 className="text-lg font-bold">{data?.project_name}</h1>
          <p className="mt-5 text-xs font-light">{data?.description}</p>

          <div className="mt-5 flex w-fit items-center justify-between gap-10">
            <div className="flex items-center gap-2">
              <Image src={supplyIcon} alt="xoxo" className="w-6" />
              <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                <span className="text-[#C2C2C2]">{data?.supply} EU</span>
                <span>Supply</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Image src={mintDateIcon} alt="xoxo" className="w-6" />
              <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                <span className="text-[#C2C2C2]">
                  {dateFormatter(data?.mint_date!, "long")}
                </span>
                <span>Mint Date</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Image src={wlSlotIcon} alt="xoxo" className="w-6" />
              <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                <span className="text-[#C2C2C2]">{data?.avl_wl_spots}</span>
                <span>Available WL Spot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
