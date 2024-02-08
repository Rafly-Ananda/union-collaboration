"use client";
import localFont from "next/font/local";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import CollaborationRequestForm from "@/app/_components/forms/CollaborationRequest";

const graphik = localFont({
  src: "../../../../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function CollabRequest() {
  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/playground">Playground</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/home/playground/project/1">
              Zeels Den
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Collaboration Request</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex w-full flex-col items-center justify-center">
        <h1 className={`${graphik.className} text-5xl font-bold`}>Zeels Den</h1>
        <h3 className="flex-none text-base font-bold">Collaboration Request</h3>
        <p className="flex-none text-sm font-light">Please fill the form</p>

        <CollaborationRequestForm />
      </div>
    </section>
  );
}
