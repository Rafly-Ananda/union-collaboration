"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import YourCreationCard from "@/app/_components/cards/YourCreationCard";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function YourCreation() {
  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Your Creation</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="my-5 rounded-md bg-white p-6">
        <h6 className="flex-none text-lg font-bold">Your Creation</h6>
        <div className="mt-5 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => (
            <YourCreationCard key={i} projectId={e.toString()} />
          ))}
        </div>
      </div>
    </section>
  );
}
