"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaXTwitter,
  FaDiscord,
  FaGlobe,
  FaXmark,
  FaCheck,
} from "react-icons/fa6";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

import MintTypeBadge from "@/app/_components/badges/MintTypeBadge";
import WhitelistInputForm from "@/app/_components/forms/WhitelistInput";
import CollabStatusBadge from "@/app/_components/badges/CollabStatus";

import { InewWhitelistInput } from "@/app/_interfaces";

import notFound from "../../../../../../../../public/assets/not_found.png";
import contactSupportLogo from "../../../../../../../../public/assets/contact_support_logo.png";

export default function RequestDetail() {
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-3);
  const collabRequestId = pathName.split("/").at(-1);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [whiteListReq, setWhitelistReq] = useState<
    InewWhitelistInput | undefined
  >(undefined);

  const { data: project } = api.project.get.useQuery({
    projectId: projectId!,
  });

  const { data: collab, refetch } = api.collab.getSingle.useQuery({
    projectId: collabRequestId!,
  });

  const { data: targetCollab } = api.project.get.useQuery(
    {
      projectId: collab?.project_id!,
    },
    { enabled: !!collab },
  );

  const applyWhiteList = api.collab.collabAddRole.useMutation({
    onSuccess() {
      refetch();
      setWhitelistReq(undefined);
    },
  });

  const onWishlistFormSubmit = () => {
    // incoming collab payload handler
    const payload = {
      wl_role: targetCollab?.whitelist_role!,
      wl_list: whiteListReq?.whitelisted_user
        ?.split(/\r?\n/)
        .filter((e) => e.length > 1)!,
      collabReqId: collab?.id!,
      type: Number(whiteListReq?.whitelist_type!),
      targetServerDiscId: collab?.guild_id_to!,
    };

    applyWhiteList.mutate({ ...payload });
  };

  useEffect(() => {
    setIsImageError(false);
  }, [targetCollab]);

  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard/your-creation">
              Your Creation
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/home/dashboard/your-creation/${projectId}`}>
              {project?.project_name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/home/dashboard/your-creation/${projectId}/request-sent`}
            >
              Request Sent
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Detail</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold text-[#DD6B20]">
            Request to {collab?.project_name}
          </h1>
        </div>

        {/* Project Actions */}
        <div className="flex items-center gap-4">
          <Link href="/home/playground/project/1/collab">
            <button className="rounded-lg bg-[#D2D2D2] p-2 text-sm font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
              <Image
                src={contactSupportLogo}
                alt="Contact Admin"
                className="mr-2 inline w-5"
              />
              Contact Admin
            </button>
          </Link>
        </div>
      </div>

      {/* About Project Card */}
      <div className="my-5 rounded-md bg-white p-6">
        <h6 className="mb-5 flex-none text-lg font-bold">About Project</h6>
        <Divider />

        <div className="mt-5 grid grid-cols-3 justify-items-center gap-6">
          {/* From */}
          <div className="flex w-52 items-center gap-2">
            <FaArrowRightFromBracket className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">From</span>
              <span className="font-bold">{collab?.collab_req_from}</span>
            </div>
          </div>

          {/* To */}
          <div className="flex w-52 items-center gap-2">
            <FaArrowRightToBracket className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">To</span>
              <span className="font-bold">{collab?.project_name}</span>
            </div>
          </div>

          {/* WL For Team */}
          <div className="flex w-52 items-center gap-2">
            <IoTriangle className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">WL For Team</span>
              <span className="font-bold">{collab?.wl_team_amt}</span>
            </div>
          </div>

          {/* Collaboration */}
          <div className="flex w-52 items-center gap-2">
            <RiTeamFill className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">Collaboration</span>
              <span className="font-bold">{collab?.type}</span>
            </div>
          </div>

          {/* WL Spots */}
          <div className="flex w-52 items-center gap-2">
            <FaStar className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">WL Spots</span>
              <span className="font-bold">{collab?.wl_spot_amt}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex w-52 items-center gap-2">
            <FaInfoCircle className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="mb-1 font-bold text-[#C2C2C2]">Status</span>
              <CollabStatusBadge collabStatus={collab?.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="flex h-[395px] flex-grow items-start justify-between gap-4">
        <div className="flex h-full w-[80%] flex-1 flex-col gap-4">
          {/* Collab Method */}
          <div className=" grow rounded-md bg-white p-6">
            <h6 className="mb-2 flex-none text-base font-bold">
              Collab Method
            </h6>
            <p className="text-xs">{collab?.method}</p>
          </div>

          {/* Notes */}
          <div className="grow rounded-md bg-white p-6">
            <h6 className="mb-2 flex-none text-base font-bold">Notes</h6>
            <p className="text-xs">{collab?.note}</p>
          </div>
        </div>

        {/* Project Image Card */}
        <div className="h-full flex-none rounded-md bg-white">
          <div className="skeleton relative h-60 w-72  rounded-none rounded-t-md">
            <Image
              src={targetCollab?.logo_url ?? notFound}
              width={300}
              height={300}
              alt="project logo"
              className="absolute h-full w-full rounded-t-md object-fill"
              onError={() => setIsImageError(true)}
              blurDataURL="../../../../public/assets/not_found.png"
              placeholder="blur"
            />
          </div>

          <div className="p-2">
            <div className="mb-2 flex flex-col items-center justify-center gap-1">
              <h1 className="text-center font-bold">{collab?.project_name}</h1>
              {/* <MintTypeBadge badgeType="pre-mint" /> */}
              <Link href={`/home/playground/project/${collab?.project_id}`}>
                <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#3182CE] p-2 text-sm font-semibold text-[#3182CE] hover:bg-[#3182CE] hover:text-white">
                  Details
                </button>
              </Link>
            </div>
            <Divider />
            <ul className="mt-2 flex items-center justify-center gap-4">
              <li>
                <a href={targetCollab?.twitter}>
                  <FaXTwitter color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={targetCollab?.discord}>
                  <FaDiscord color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={targetCollab?.website}>
                  <FaGlobe color="#C2C2C2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {collab?.status !== "On Offering" && (
        <>
          {/* OPTIONAL WHITELIST INPUT FORM */}
          <div className="mt-5 h-full w-full">
            <WhitelistInputForm
              receiver={targetCollab}
              requester={project}
              collabDetail={collab}
              requestType="sent"
              whiteListReq={whiteListReq}
              setWhitelistReq={setWhitelistReq}
              onWhitelistSubmit={onWishlistFormSubmit}
            />
          </div>
        </>
      )}
    </section>
  );
}
