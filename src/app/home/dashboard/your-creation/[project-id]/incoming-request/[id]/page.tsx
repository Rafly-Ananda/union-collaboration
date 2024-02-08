"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import contactSupportLogo from "../../../../../../../../public/assets/contact_support_logo.png";

export default function RequestDetail() {
  const pathName = usePathname();
  const projectIdentifier = pathName.split("/").at(-3);

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

      <div className="mt-5 flex items-center  justify-between">
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
    </section>
  );
}
