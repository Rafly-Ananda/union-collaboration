"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import DaoForm from "@/app/_components/forms/Dao";
import type { InewDaoInput } from "@/app/_interfaces";
import { EmintInfo } from "@/app/_interfaces";
import axios from "axios";

export default function CreateDao() {
  const router = useRouter();
  const [newDao, setNewDao] = useState<InewDaoInput>({
    project_name: "default",
    description: "",
    whitelist_role: "default",
    discord: "",
    twitter: "",
    website: "",
  });

  const { data: userGuilds } = api.user.getGuilds.useQuery();

  const { data: guildRoles } = api.user.getGuildsRoles.useQuery({
    guild_discord_id:
      userGuilds?.find((e) => e.guild_name === newDao.project_name)?.guild_id ??
      "random",
  });

  const createDao = api.project.create.useMutation({
    onSuccess: ({ data }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      router.push(`/home/dashboard/your-creation/${data.project.id}`);
    },
  });

  const uploadPresignedUrlGen = api.s3.createPresignedUrl.useMutation({
    onSuccess: async ({ url, fields }) => {
      await onImageUploadCb(url, fields);
    },
  });

  const onImageUploadCb = async (url: string, fields: object) => {
    const formData = new FormData();
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

      createDao.mutate({
        project: {
          ...newDao,
          type: "dao",
          mint_info: EmintInfo.DAO,
          guild_id: userGuilds?.find(
            (e) => e.guild_name === newDao.project_name,
          )?.guild_id,
          logo_url: newDao?.project_logo?.name,
        },
      });
    }
  };

  const onDaoSubmit = async () => {
    uploadPresignedUrlGen.mutate({
      fileName: newDao?.project_logo?.name,
    });
  };

  return (
    <DaoForm
      userGuilds={userGuilds}
      userGuildRoles={guildRoles}
      onDaoubmitAction={onDaoSubmit}
      localDaoState={newDao}
      localDaoSetState={setNewDao}
    />
  );
}
