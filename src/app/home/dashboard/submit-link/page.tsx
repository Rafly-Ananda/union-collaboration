"use client";
import LinkSubmit from "@/app/_components/checker/LinkSubmit";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function SubmitLink() {
  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Submit Link</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <LinkSubmit />
    </section>
  );
}
