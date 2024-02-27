"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input, Select, Textarea } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import localFont from "next/font/local";
import type {
  IProject,
  InewDaoInput,
  IUserGuilds,
  IUserGuildRoles,
} from "@/app/_interfaces";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function DaoForm({
  dao,
  userGuildRoles,
  userGuilds,
  onDaoubmitAction,
  localDaoState,
  localDaoSetState,
}: {
  dao?: IProject | undefined;
  userGuildRoles: IUserGuildRoles | undefined;
  userGuilds: IUserGuilds[] | undefined;
  onDaoubmitAction: () => void;
  localDaoState: InewDaoInput;
  localDaoSetState: React.Dispatch<React.SetStateAction<InewDaoInput>>;
}) {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const formRef = useRef(null);

  const onBackClick = () => {
    router.back();
  };

  const cb = (entries: IntersectionObserverEntry[]) => {
    const isIntersecting = entries.at(0)?.isIntersecting;
    setIsFormVisible(isIntersecting ?? false);
  };

  const opts = {
    root: null,
    rootMargin: "0px",
    threshold: 0.85,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cb, opts);
    if (formRef.current) observer.observe(formRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, [formRef, opts]);

  return (
    <div>
      <div ref={formRef}></div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className={`${graphik.className} text-5xl font-bold`}>
          {dao ? "Edit" : "Create"} Dao
        </h1>
        <p>Please fill the form.</p>
      </div>

      <div className="mt-5 flex w-full gap-10 ">
        {/* Form */}
        <div className="w-[65%] rounded-xl bg-[#FBFBFB] px-5 py-10">
          {/* Dao Server */}
          <FormControl isRequired={true}>
            <FormLabel>Dao Server</FormLabel>
            <Select
              isDisabled={dao ? true : false}
              name="project_name"
              value={localDaoState.project_name}
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option hidden disabled value="default">
                Select Discord Server...
              </option>
              {userGuilds?.map((e, i) => (
                <option value={e.guild_name} key={e.guild_name + i}>
                  {e.guild_name}
                </option>
              ))}
            </Select>
            <FormHelperText>
              {dao
                ? `You cannot change the server again. Please get in touch with the
              admin if this was a mistake.`
                : `Your project name will be the same as your discord project name. Once it has been saved, you cannot change the server again.`}
            </FormHelperText>
          </FormControl>

          {/* Project Description */}
          <FormControl isRequired={true} className="mt-5">
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Your project descriptions..."
              name="description"
              value={localDaoState.description}
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </FormControl>

          {/* Whitelist Role */}
          <FormControl className="mt-5">
            <FormLabel>Whitelist Role</FormLabel>
            <div className=" flex gap-4">
              <Select
                isDisabled={
                  userGuildRoles && userGuildRoles?.roles.length < 1
                    ? true
                    : false
                }
                className="w-[80%]"
                name="whitelist_role"
                value={localDaoState.whitelist_role}
                onChange={(e) =>
                  localDaoSetState((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <option hidden disabled value="default">
                  Select
                </option>
                {userGuildRoles?.roles?.map((e, i) => (
                  <option value={e} key={e + i}>
                    {e}
                  </option>
                ))}
              </Select>
              <a
                href="https://discord.com/oauth2/authorize?client_id=1206650650193174540&scope=bot&permissions=268435456"
                className="w-[20%]"
                target="_blank"
              >
                <button className="h-full w-full rounded-md border border-[#cbd5e0] font-bold hover:bg-[#b9c2cc]">
                  Invite Bot
                </button>
              </a>
            </div>
            <FormHelperText>
              You need to have Union Bot in you Discord server to be able to
              select the whitelist role
            </FormHelperText>
          </FormControl>

          {/* Discord */}
          <FormControl className="mt-5">
            <FormLabel>Discord</FormLabel>
            <Input
              placeholder="Discord Link..."
              name="discord"
              value={localDaoState.discord}
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </FormControl>

          {/* X/Twitter */}
          <FormControl className="mt-5">
            <FormLabel>X / Twitter</FormLabel>
            <Input
              placeholder="X / Twitter Link..."
              name="twitter"
              value={localDaoState.twitter}
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </FormControl>

          {/* Website */}
          <FormControl className="mt-5">
            <FormLabel>Website</FormLabel>
            <Input
              placeholder="Website Link..."
              name="website"
              value={localDaoState.website}
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </FormControl>

          {/* Project Logo */}
          <FormControl className="mt-5" isRequired={true}>
            <FormLabel>Project Logo (Max 200kb)</FormLabel>
            <Input
              type="file"
              name="project_logo"
              onChange={(e) =>
                localDaoSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.files?.[0],
                }))
              }
            />
          </FormControl>
        </div>

        {/* Submits */}
        <div className={`sticky top-0 h-fit w-[30%] `}>
          <div className="rounded-xl  bg-[#FFF2CE] px-5 py-10 ">
            <p className="font-bold text-[#856100]">Attention</p>
            <div className="h-[2px] w-full"></div>
            <p className="text-sm text-[#856100]">
              After submitting the dao,
              <strong> please contact our admin</strong> to process your dao to
              be displayed in main page.
            </p>
          </div>

          <div className="mt-2 flex items-center justify-center gap-5">
            <button
              className="w-full rounded-md border border-[#cbd5e0] bg-white p-3 font-bold hover:bg-[#b9c2cc]"
              onClick={onBackClick}
            >
              Back
            </button>
            <button
              className="w-full rounded-md border border-[#cbd5e0] bg-black p-3 font-bold text-white hover:bg-[#b9c2cc]"
              onClick={onDaoubmitAction}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
