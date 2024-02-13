"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import ProjectForm from "@/app/_components/forms/ProjectForm";
import DaoForm from "@/app/_components/forms/DaoForm";

export default function EditProject() {
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-2);

  const { data: project, isFetched } = api.project.get.useQuery({
    projectId: projectId!,
  });
  const { data: userGuilds } = api.user.getGuilds.useQuery();

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

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Edit</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div>
        {isFetched && (
          <>
            {project?.type === "project" ? (
              <ProjectForm />
            ) : (
              <DaoForm dao={project} userGuilds={userGuilds} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
