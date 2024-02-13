"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/app/_components/forms/Project";
import DaoForm from "@/app/_components/forms/Dao";
import { InewProjectInput, EmintInfo, InewDaoInput } from "@/app/_interfaces";
import { dateFormatter } from "@/app/_utils/dateFormatter";

export default function EditProject() {
  const router = useRouter();
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-2);
  const { data: project, isFetched } = api.project.get.useQuery({
    projectId: projectId!,
  });
  const { data: userGuilds } = api.user.getGuilds.useQuery();

  const [newProject, setNewProject] = useState<InewProjectInput>({
    project_name: project ? project.project_name! : "default",
    description: project ? project.description! : "",
    supply: project ? project.supply! : 0,
    website: project ? project.website! : "",
    discord: project ? project.discord! : "",
    twitter: project ? project.twitter! : "",
    mint_info: project ? project?.mint_info! : EmintInfo.PRE,
    mint_date: project
      ? dateFormatter(project?.mint_date!, "short", "-", true)
      : "",
    avl_wl_spots: project ? project.avl_wl_spots! : 0,
    whitelist_role: project ? project.whitelist_role! : "default",
  });

  const [newDao, setNewDao] = useState<InewDaoInput>({
    project_name: project ? project.project_name! : "default",
    description: project ? project.description! : "",
    whitelist_role: project ? project.whitelist_role! : "default",
    discord: project ? project.discord! : "",
    twitter: project ? project.twitter! : "",
    website: project ? project.website! : "",
  });

  const updateProjectorDao = api.project.editProject.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const onProjectSubmit = async () => {
    updateProjectorDao.mutate({
      project: {
        ...newProject,
        id: project?.id!,
        type: project?.type!,
        logo_url: "adasds",
      },
    });
  };

  const onSubmitDao = async () => {
    updateProjectorDao.mutate({
      project: {
        ...newDao,
        id: project?.id!,
        type: project?.type!,
        mint_info: project?.mint_info!,
        logo_url: "adasds",
      },
    });
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
              <ProjectForm
                project={project}
                userGuilds={userGuilds}
                onProjectSubmitAction={onProjectSubmit}
                localProjectState={newProject}
                localProjectSetState={setNewProject}
              />
            ) : (
              <DaoForm
                dao={project}
                userGuilds={userGuilds}
                onDaoubmitAction={onSubmitDao}
                localDaoState={newDao}
                localDaoSetState={setNewDao}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
