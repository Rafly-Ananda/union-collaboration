"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import DaoForm from "@/app/_components/forms/Dao";
import type { InewDaoInput } from "@/app/_interfaces";
import { EmintInfo } from "@/app/_interfaces";
export default function CreateDao() {
  const router = useRouter();
  const { data: userGuilds } = api.user.getGuilds.useQuery();
  const [newDao, setNewDao] = useState<InewDaoInput>({
    project_name: "default",
    description: "",
    whitelist_role: "default",
    discord: "",
    twitter: "",
    website: "",
  });

  const createDao = api.project.create.useMutation({
    onSuccess: ({ data }) => {
      router.push(`/home/dashboard/your-creation/${data?.project?.id}`);
    },
  });

  const onDaoSubmit = async () => {
    createDao.mutate({
      logoFile: "",
      project: {
        ...newDao,
        type: "dao",
        mint_info: EmintInfo.DAO,
        guild_id: userGuilds?.find((e) => e.guild_name === newDao.project_name)
          ?.guild_id,
        logo_url: "adasds",
      },
    });
  };

  return (
    <DaoForm
      userGuilds={userGuilds}
      onDaoubmitAction={onDaoSubmit}
      localDaoState={newDao}
      localDaoSetState={setNewDao}
    />
  );
}
