"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Select, Textarea } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import localFont from "next/font/local";
import type { InewDaoInput } from "@/app/_interfaces";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default function DaoForm() {
  const router = useRouter();
  const [newDao, setNewDao] = useState<InewDaoInput | undefined>();

  const onBackClick = () => {
    router.push("/home/dashboard");
  };

  const onNewDaoSubmit = async () => {
    console.log(newDao);
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className={`${graphik.className} text-5xl font-bold`}>
          Edit/Create Dao
        </h1>
        <p>Please fill the form.</p>
      </div>

      <div className="flex w-full gap-10">
        <div className="w-[65%] rounded-xl bg-[#FBFBFB] px-5 py-10">
          {/* Dao Server */}
          <FormControl isRequired={true}>
            <FormLabel>Dao Server</FormLabel>
            <Select
              name="discord_server"
              value={newDao?.discord_server ?? "default"}
              onChange={(e) =>
                setNewDao((prev) => ({
                  ...prev!,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option hidden disabled value="default">
                Select Discord Server...
              </option>
              {/* {userGuilds?.map((e: Iguild) => (
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
              placeholder="Your project descriptions..."
              name="description"
              value={newDao?.description ?? ""}
              onChange={(e) =>
                setNewDao((prev) => ({
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
                className="w-[80%]"
                name="whitelist_role"
                value={newDao?.whitelist_role ?? "default"}
                onChange={(e) =>
                  setNewDao((prev) => ({
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
              <button className="w-[20%] rounded-md border border-[#cbd5e0] font-bold hover:bg-[#b9c2cc]">
                Invite Bot
              </button>
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
              name="discord_link"
              value={newDao?.discord_link ?? ""}
              onChange={(e) =>
                setNewDao((prev) => ({
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
              value={newDao?.x_link ?? ""}
              onChange={(e) =>
                setNewDao((prev) => ({
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
              value={newDao?.web_link ?? ""}
              onChange={(e) =>
                setNewDao((prev) => ({
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
                setNewDao((prev) => ({
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
              onClick={onNewDaoSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
