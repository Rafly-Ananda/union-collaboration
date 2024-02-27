"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import localFont from "next/font/local";
import type {
  IProject,
  InewProjectInput,
  IUserGuilds,
  IUserGuildRoles,
} from "@/app/_interfaces";
import { EmintInfo } from "@/app/_interfaces";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function ProjectForm({
  project,
  userGuildRoles,
  userGuilds,
  onProjectSubmitAction,
  localProjectState,
  localProjectSetState,
}: {
  project?: IProject | undefined;
  userGuildRoles: IUserGuildRoles | undefined;
  userGuilds: IUserGuilds[] | undefined;
  onProjectSubmitAction: () => void;
  localProjectState: InewProjectInput;
  localProjectSetState: React.Dispatch<React.SetStateAction<InewProjectInput>>;
}) {
  const router = useRouter();

  const onBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className={`${graphik.className} text-5xl font-bold`}>
          {project ? "Edit" : "Create"} Project
        </h1>
        <p>Please fill the form.</p>
      </div>

      <div className="mt-5 flex w-full gap-10">
        <div className="w-[65%] rounded-xl bg-[#FBFBFB] px-5 py-10">
          {/* Project Server */}
          <FormControl isRequired={true}>
            <FormLabel>Project Server</FormLabel>
            <Select
              isDisabled={project ? true : false}
              name="project_name"
              value={localProjectState.project_name}
              onChange={(e) =>
                localProjectSetState((prev) => ({
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
              {project
                ? `You cannot change the server again. Please get in touch with the
              admin if this was a mistake.`
                : `Your project name will be the same as your discord project name. Once it has been saved, you cannot change the server again.`}
            </FormHelperText>
          </FormControl>

          {/* Project Description */}
          <FormControl isRequired={true} className="mt-5">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Your project descriptions..."
              value={localProjectState?.description}
              onChange={(e) =>
                localProjectSetState((prev) => ({
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
                value={localProjectState.whitelist_role}
                onChange={(e) =>
                  localProjectSetState((prev) => ({
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

          {/* Mint Info */}
          <FormControl isRequired={true} className="mt-5">
            <FormLabel>Mint Info</FormLabel>
            <RadioGroup
              name="mint_info"
              value={localProjectState?.mint_info}
              onChange={(e) =>
                localProjectSetState((prev) => ({
                  ...prev,
                  mint_info: e as EmintInfo,
                }))
              }
            >
              <div className="flex items-center justify-start gap-20">
                <Radio value={EmintInfo.PRE}>Pre-Mint</Radio>
                <Radio value={EmintInfo.POST}>Post-Mint</Radio>
              </div>
            </RadioGroup>
          </FormControl>

          {/* Mint Date */}
          <FormControl className="mt-5">
            <FormLabel>Mint Date</FormLabel>
            <Input
              size="md"
              type="date"
              name="mint_date"
              value={localProjectState?.mint_date}
              onChange={(e) =>
                localProjectSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </FormControl>

          {/* Mint Price */}
          <FormControl className="mt-5">
            <FormLabel>Mint Price</FormLabel>
            <NumberInput value={localProjectState?.mint_price}>
              <NumberInputField
                name="mint_price"
                onChange={(e) =>
                  localProjectSetState((prev) => ({
                    ...prev,
                    [e.target.name]: +e.target.value,
                  }))
                }
              />
            </NumberInput>
          </FormControl>

          {/* Supply */}
          <FormControl className="mt-5">
            <FormLabel>Supply</FormLabel>
            <NumberInput value={localProjectState?.supply}>
              <NumberInputField
                name="supply"
                onChange={(e) =>
                  localProjectSetState((prev) => ({
                    ...prev,
                    [e.target.name]: +e.target.value,
                  }))
                }
              />
            </NumberInput>
          </FormControl>

          {/* Available WL Spots */}
          <FormControl className="mt-5">
            <FormLabel>Available WL Spots</FormLabel>
            <NumberInput value={localProjectState?.avl_wl_spots}>
              <NumberInputField
                name="avl_wl_spots"
                onChange={(e) =>
                  localProjectSetState((prev) => ({
                    ...prev,
                    [e.target.name]: +e.target.value,
                  }))
                }
              />
            </NumberInput>
          </FormControl>

          {/* Discord */}
          <FormControl className="mt-5">
            <FormLabel>Discord</FormLabel>
            <Input
              placeholder="Discord Link..."
              name="discord"
              value={localProjectState.discord}
              onChange={(e) =>
                localProjectSetState((prev) => ({
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
              value={localProjectState.twitter}
              onChange={(e) =>
                localProjectSetState((prev) => ({
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
              value={localProjectState.website}
              onChange={(e) =>
                localProjectSetState((prev) => ({
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
              placeholder="Website Link..."
              type="file"
              name="project_logo"
              onChange={(e) =>
                localProjectSetState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.files?.[0],
                }))
              }
            />
          </FormControl>
        </div>

        {/* Submits */}
        <div className="w-[30%]">
          <div className="rounded-xl  bg-[#FFF2CE] px-5 py-10 ">
            <p className="font-bold text-[#856100]">Attention</p>
            <div className="h-[2px] w-full"></div>
            <p className="text-sm text-[#856100]">
              After submitting the project,
              <strong> please contact our admin</strong> to process your project
              to be displayed in main page.
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
              onClick={onProjectSubmitAction}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
