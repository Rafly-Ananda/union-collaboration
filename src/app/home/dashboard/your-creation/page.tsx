"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import YourCreationCard from "@/app/_components/cards/YourCreationCard";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { CLIENT_CONFIG } from "@/app/_config/config";

export default function YourCreation() {
  const { data: userSession } = useSession();
  const userExternal = userSession?.user.extras.id;

  const { data, isLoading, isError } = api.project.getAll.useQuery({
    page: 1,
    pageSize: 200,
    externalUserId: userExternal,
  });

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
          {data?.projects.map((e, i) => (
            <YourCreationCard key={i} project={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
