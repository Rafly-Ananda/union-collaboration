"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { InewProjectInput, EmintInfo } from "@/app/_interfaces";
import ProjectForm from "@/app/_components/forms/Project";

export default function CreateProject() {
  const router = useRouter();
  const { data: userGuilds } = api.user.getGuilds.useQuery();
  const [newProject, setNewProject] = useState<InewProjectInput>({
    project_name: "default",
    description: "",
    supply: 0,
    website: "",
    discord: "",
    twitter: "",
    mint_info: EmintInfo.PRE,
    mint_date: "",
    avl_wl_spots: 0,
    whitelist_role: "default",
  });

  const createProject = api.project.create.useMutation({
    onSuccess: ({ data }) => {
      router.push(`/home/dashboard/your-creation/${data?.project?.id}`);
    },
  });

  const onProjectSubmit = async () => {
    createProject.mutate({
      logoFile: "",
      project: {
        ...newProject,
        type: "project",
        logo_url: "adasds",
        guild_id: userGuilds?.find(
          (e) => e.guild_name === newProject.project_name,
        )?.guild_id,
      },
    });
  };

  return (
    <ProjectForm
      userGuilds={userGuilds}
      onProjectSubmitAction={onProjectSubmit}
      localProjectState={newProject}
      localProjectSetState={setNewProject}
    />
  );
}
