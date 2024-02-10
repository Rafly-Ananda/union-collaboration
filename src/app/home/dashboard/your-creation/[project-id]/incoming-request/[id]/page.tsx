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

import MintTypeBadge from "@/app/_components/badges/MintTypeBadge";
import WhitelistInputForm from "@/app/_components/forms/WhitelistInput";

import deleteMeLater from "../../../../../../../../public/assets/delete_me_later.png";
import contactSupportLogo from "../../../../../../../../public/assets/contact_support_logo.png";

export default function RequestDetail() {
  const pathName = usePathname();
  const projectIdentifier = pathName.split("/").at(-3);

  const onCollabAgreed = () => {
    console.log("agreed");
  };

  const onCollabReject = () => {
    console.log("rejected");
  };

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
            <BreadcrumbLink
              href={`/home/dashboard/your-creation/${projectIdentifier}/incoming-request`}
            >
              Incoming Request
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Request Detail</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold text-[#319795]">
            Request From Zeels Den
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
              <span className="font-bold">Quantum Breaker</span>
            </div>
          </div>

          {/* To */}
          <div className="flex w-52 items-center gap-2">
            <FaArrowRightToBracket className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">To</span>
              <span className="font-bold">Zeel Den</span>
            </div>
          </div>

          {/* WL For Team */}
          <div className="flex w-52 items-center gap-2">
            <IoTriangle className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">WL For Team</span>
              <span className="font-bold">-</span>
            </div>
          </div>

          {/* Collaboration */}
          <div className="flex w-52 items-center gap-2">
            <RiTeamFill className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">Collaboration</span>
              <span className="font-bold">Offering WL</span>
            </div>
          </div>

          {/* WL Spots */}
          <div className="flex w-52 items-center gap-2">
            <FaStar className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">WL Spots</span>
              <span className="font-bold">20</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex w-52 items-center gap-2">
            <FaInfoCircle className="text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#C2C2C2]">Status</span>
              <span className="font-bold text-[#43936C]">Agreed</span>
              <span className="font-bold text-[#E53E3E]">Rejected</span>
              <span className="font-bold text-[#DD6B20]">On Offering</span>
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
            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Notes */}
          <div className="grow rounded-md bg-white p-6">
            <h6 className="mb-2 flex-none text-base font-bold">Notes</h6>
            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Agree or Reject */}
          <div className="grow rounded-md bg-white p-6">
            <h6 className="mb-2 flex-none text-base font-bold">
              Collaboration Agreement
            </h6>

            {/* If already accepted show this text */}
            <p className="text-sm font-semibold text-[#43936C]">
              You already agreed with this collab.
            </p>

            {/* If rejected show this text */}
            {/* <p className="font-semibold text-[#E53E3E] text-sm">
              You already rejected this collab.
            </p> */}

            {/* If status Pending Show this button */}
            {/* <div className="flex w-full items-center justify-start gap-5 font-semibold">
              <button
                className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#43936C] p-2 text-[#43936C] hover:bg-[#43936C] hover:text-white"
                onClick={onCollabAgreed}
              >
                <FaCheck />
                Agree
              </button>
              <button
                className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#E53E3E] p-2 text-[#E53E3E] hover:bg-[#E53E3E] hover:text-white"
                onClick={onCollabReject}
              >
                <FaXmark />
                Reject
              </button>
            </div> */}
          </div>
        </div>

        {/* Project Image Card */}
        <div className="h-full flex-none rounded-md bg-white">
          <Image src={deleteMeLater} alt="xoxo" className="w-60 rounded-t-md" />

          <div className="p-2">
            <div className="mb-2 flex flex-col items-center justify-center gap-1">
              <h1 className="text-center font-bold">Zeels Den</h1>
              <MintTypeBadge badgeType="pre-mint" />
              <Link href={`/home/playground/project/${projectIdentifier}`}>
                <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#3182CE] p-2 text-sm font-semibold text-[#3182CE] hover:bg-[#3182CE] hover:text-white">
                  Details
                </button>
              </Link>
            </div>
            <Divider />
            <ul className="mt-2 flex items-center justify-center gap-4">
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
          </div>
        </div>
      </div>

      {/* OPTIONAL WHITELIST INPUT FORM */}
      <div className="mt-5 h-full w-full">
        <WhitelistInputForm projectId={projectIdentifier} />
      </div>
    </section>
  );
}
