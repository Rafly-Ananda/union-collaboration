"use client";
import localFont from "next/font/local";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import CollaborationRequestForm from "@/app/_components/forms/Collab";

const graphik = localFont({
  src: "../../../../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function CollabRequest() {
  const { data: userSession } = useSession();
  const userExternal = userSession?.user.extras.id;
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-2);
  const { data: targetProject } = api.project.get.useQuery({
    projectId: projectId!,
  });

  const { data: ownProject } = api.project.getAll.useQuery({
    page: 1,
    pageSize: 1000,
    externalUserId: userExternal,
  });

  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/playground">Playground</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/home/playground/project/${targetProject?.id}`}
            >
              {targetProject?.project_name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Collaboration Request</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex w-full flex-col items-center justify-center">
        <h1 className={`${graphik.className} text-5xl font-bold`}>
          {targetProject?.project_name}
        </h1>
        <h3 className="mt-2 flex-none text-base font-bold">
          Collaboration Request
        </h3>
        <p className="flex-none text-sm font-light">Please fill the form</p>

        <CollaborationRequestForm ownProjects={ownProject?.projects} />
      </div>
    </section>
  );
}
