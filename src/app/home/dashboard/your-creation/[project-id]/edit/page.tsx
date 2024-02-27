"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/app/_components/forms/Project";
import DaoForm from "@/app/_components/forms/Dao";
import type { InewProjectInput, InewDaoInput } from "@/app/_interfaces";
import { EmintInfo } from "@/app/_interfaces";

import { dateFormatter } from "@/app/_utils/dateFormatter";
import axios from "axios";

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
    mint_info: project ? project?.mint_info : EmintInfo.PRE,
    mint_price: project ? project?.mint_price : 0,
    mint_date: project
      ? dateFormatter(project?.mint_date, "short", "-", true)
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

  const { data: guildRolesOnProject } = api.user.getGuildsRoles.useQuery({
    guild_discord_id:
      userGuilds?.find((e) => e.guild_name === newProject.project_name)
        ?.guild_id ?? "random",
  });

  const { data: guildRolesOnDao } = api.user.getGuildsRoles.useQuery({
    guild_discord_id:
      userGuilds?.find((e) => e.guild_name === newDao.project_name)?.guild_id ??
      "random",
  });

  const updateProjectorDao = api.project.editProject.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const uploadPresignedUrlGen = api.s3.createPresignedUrl.useMutation({
    onSuccess: async ({ url, fields }) => {
      await onImageUploadCb(url, fields);
    },
  });

  const onImageUploadCb = async (url: string, fields: object) => {
    const formData = new FormData();

    if (project?.type === "project") {
      if (newProject) {
        const payload = {
          ...fields,
          "Content-Type": newProject?.project_logo?.type,
          file: newProject?.project_logo,
        };

        Object.entries(payload).forEach((e) => {
          formData.append(e[0], e[1] as string | Blob);
        });

        await axios.post(url, formData);

        updateProjectorDao.mutate({
          project: {
            ...newProject,
            id: project?.id,
            type: project?.type,
            logo_url: newProject?.project_logo?.name,
          },
        });
      }
    } else {
      if (newDao) {
        const payload = {
          ...fields,
          "Content-Type": newDao?.project_logo?.type,
          file: newDao?.project_logo,
        };

        Object.entries(payload).forEach((e) => {
          formData.append(e[0], e[1] as string | Blob);
        });

        await axios.post(url, formData);

        if (project?.type) {
          updateProjectorDao.mutate({
            project: {
              ...newDao,
              id: project?.id,
              type: project?.type,
              mint_info: project?.mint_info,
              logo_url: newDao?.project_logo?.name,
            },
          });
        }
      }
    }
  };

  const onProjectSubmit = async () => {
    if (newProject?.project_logo) {
      uploadPresignedUrlGen.mutate({
        fileName: newProject?.project_logo?.name,
      });
    } else {
      if (project?.type) {
        updateProjectorDao.mutate({
          project: {
            ...newProject,
            id: project?.id,
            type: project?.type,
            logo_url: project?.logo_base_url,
          },
        });
      }
    }
  };

  const onSubmitDao = async () => {
    if (newDao?.project_logo) {
      uploadPresignedUrlGen.mutate({
        fileName: newDao?.project_logo?.name,
      });
    } else {
      if (project?.type) {
        updateProjectorDao.mutate({
          project: {
            ...newDao,
            id: project?.id,
            type: project?.type,
            mint_info: project?.mint_info,
            logo_url: project?.logo_base_url,
          },
        });
      }
    }
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
                userGuildRoles={guildRolesOnProject}
              />
            ) : (
              <DaoForm
                dao={project}
                userGuilds={userGuilds}
                onDaoubmitAction={onSubmitDao}
                localDaoState={newDao}
                localDaoSetState={setNewDao}
                userGuildRoles={guildRolesOnDao}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
