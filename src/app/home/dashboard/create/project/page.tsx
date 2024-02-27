"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { EmintInfo } from "@/app/_interfaces";
import type { InewProjectInput } from "@/app/_interfaces";

import ProjectForm from "@/app/_components/forms/Project";
import axios from "axios";

export default function CreateProject() {
  const router = useRouter();
  const [newProject, setNewProject] = useState<InewProjectInput>({
    project_name: "default",
    description: "",
    supply: 0,
    website: "",
    discord: "",
    twitter: "",
    mint_info: EmintInfo.PRE,
    mint_price: 0,
    mint_date: "",
    avl_wl_spots: 0,
    whitelist_role: "default",
  });

  const { data: userGuilds } = api.user.getGuilds.useQuery();

  const { data: guildRoles } = api.user.getGuildsRoles.useQuery({
    guild_discord_id:
      userGuilds?.find((e) => e.guild_name === newProject.project_name)
        ?.guild_id ?? "random",
  });

  const createProject = api.project.create.useMutation({
    onSuccess: ({ data }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      router.push(`/home/dashboard/your-creation/${data?.project?.id}`);
    },
  });

  const uploadPresignedUrlGen = api.s3.createPresignedUrl.useMutation({
    onSuccess: async ({ url, fields }) => {
      await onImageUploadCb(url, fields);
    },
  });

  const onImageUploadCb = async (url: string, fields: object) => {
    const formData = new FormData();
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

      createProject.mutate({
        project: {
          ...newProject,
          type: "project",
          guild_id: userGuilds?.find(
            (e) => e.guild_name === newProject.project_name,
          )?.guild_id,
          logo_url: newProject?.project_logo?.name,
        },
      });
    }
  };

  const onProjectSubmit = async () => {
    uploadPresignedUrlGen.mutate({
      fileName: newProject?.project_logo?.name,
    });
  };

  return (
    <ProjectForm
      userGuilds={userGuilds}
      userGuildRoles={guildRoles}
      onProjectSubmitAction={onProjectSubmit}
      localProjectState={newProject}
      localProjectSetState={setNewProject}
    />
  );
}
