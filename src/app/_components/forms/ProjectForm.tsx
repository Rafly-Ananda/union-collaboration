"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import type { InewProjectInput, EmintInfo } from "@/interfaces/client";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function ProjectForm() {
  const router = useRouter();
  const [newProject, setNewProject] = useState<InewProjectInput | undefined>();

  const onBackClick = () => {
    router.push("/home/dashboard");
  };

  const onNewProjectSubmit = async () => {
    console.log(newProject);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className={`${graphik.className} text-5xl font-bold`}>
          Edit/Create Project
        </h1>
        <p>Please fill the form.</p>
      </div>

      <div className="mt-5 flex w-full gap-10">
        <div className="w-[65%] rounded-xl bg-[#FBFBFB] px-5 py-10">
          {/* Project Server */}
          <FormControl isRequired={true}>
            <FormLabel>Project Server</FormLabel>
            <Select
              name="discord_server"
              value={newProject?.discord_server ?? "default"}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option hidden disabled value="default">
                Select Discord Server...
              </option>
              {/* {userGuilds &&
              userGuilds.map((e: Iguild) => (
                <option key={e.name} value={e.id}>
                  {e.name}
                </option>
              ))} */}
            </Select>
            <FormHelperText>
              Your project name will be the same as your discord project name.
              Once it has been saved, you cannot change the server again.
            </FormHelperText>
          </FormControl>

          {/* Project Description */}
          <FormControl isRequired={true} className="mt-5">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Your project descriptions..."
              value={newProject?.description ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
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
                name="whitelist_role"
                className="w-[80%]"
                value={newProject?.whitelist_role ?? "default"}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev!,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <option hidden disabled value="default">
                  Select
                </option>
                <option>Server A</option>
                <option>Server B</option>
                <option>Server C</option>
              </Select>
              <a
                href="https://discord.com/oauth2/authorize?client_id=982629085287170099&permissions=268435456&scope=bot%20applications.commands"
                className="w-[20%]"
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
              value={newProject?.mint_info ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
                  mint_info: e as EmintInfo,
                }))
              }
            >
              <div className="flex items-center justify-start gap-20">
                <Radio value="pre_mint">Pre-Mint</Radio>
                <Radio value="post_mint">Post-Mint</Radio>
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
              value={newProject?.mint_date ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
                  [e.target.name]: new Date(e.target.value),
                }))
              }
            />
          </FormControl>

          {/* Supply */}
          <FormControl className="mt-5">
            <FormLabel>Supply</FormLabel>
            <NumberInput>
              <NumberInputField
                name="supply"
                value={newProject?.supply ?? ""}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev!,
                    [e.target.name]: +e.target.value,
                  }))
                }
              />
            </NumberInput>
          </FormControl>

          {/* Available WL Spots */}
          <FormControl className="mt-5">
            <FormLabel>Available WL Spots</FormLabel>
            <NumberInput>
              <NumberInputField
                name="available_wl_spot"
                value={newProject?.available_wl_spot ?? ""}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev!,
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
              name="discord_link"
              value={newProject?.discord_link ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
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
              name="x_link"
              value={newProject?.x_link ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
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
              name="web_link"
              value={newProject?.web_link ?? ""}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev!,
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
                setNewProject((prev) => ({
                  ...prev!,
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
              onClick={onNewProjectSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
