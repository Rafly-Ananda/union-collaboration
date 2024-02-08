"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Input, Select, Textarea } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import type { INewCollaborationRequest } from "@/interfaces/client";

export default function CollaborationRequestForm() {
  const pathName = usePathname();
  const projectIdentifier = pathName.split("/").at(-2);
  const router = useRouter();
  const [newCollaboration, setNewCollaboration] = useState<
    INewCollaborationRequest | undefined
  >();

  const onBackClick = () => {
    router.push(`/home/playground/project/${projectIdentifier}`);
  };

  const onCollaborationRequestSubmit = async () => {
    console.log(newCollaboration);
  };

  return (
    <div className="mt-5 flex w-full gap-10">
      <div className="w-full rounded-xl bg-[#FBFBFB] px-5 py-10">
        {/* Collaboration */}
        <FormControl isRequired={true}>
          <FormLabel>Mint Info</FormLabel>
          <RadioGroup
            name="collaboration"
            value={newCollaboration?.collaboration ?? ""}
            onChange={(e: string) =>
              setNewCollaboration((prev) => ({
                ...prev!,
                collaboration: e,
              }))
            }
          >
            <div className="flex items-center justify-start gap-20">
              <Radio value="offering-wl">Offering WL</Radio>
              <Radio value="requesting-wl">Requesting WL</Radio>
              <Radio value="wl-exhange">WL Exchange</Radio>
            </div>
          </RadioGroup>
        </FormControl>

        {/* Represented As */}
        <FormControl isRequired={true} className="mt-5">
          <FormLabel>Represented As</FormLabel>
          <Select
            name="represented_as"
            value={newCollaboration?.represented_as ?? "default"}
            onChange={(e) =>
              setNewCollaboration((prev) => ({
                ...prev!,
                [e.target.name]: e.target.value,
              }))
            }
          >
            <option hidden disabled value="default">
              Select ...
            </option>
            {/* {userGuilds &&
              userGuilds.map((e: Iguild) => (
                <option key={e.name} value={e.id}>
                  {e.name}
                </option>
              ))} */}
          </Select>
        </FormControl>

        {/* WL Spot Quantity */}
        <FormControl className="mt-5" isRequired>
          <FormLabel>How Many WL Spot</FormLabel>
          <NumberInput>
            <NumberInputField
              name="wl_spot"
              value={newCollaboration?.wl_spot ?? 0}
              onChange={(e) =>
                setNewCollaboration((prev) => ({
                  ...prev!,
                  [e.target.name]: +e.target.value,
                }))
              }
            />
          </NumberInput>
        </FormControl>

        {/* Team WL Spot Quantity */}
        <FormControl className="mt-5">
          <FormLabel>How Many for Teams</FormLabel>
          <NumberInput>
            <NumberInputField
              name="team_spot"
              value={newCollaboration?.wl_spot ?? 0}
              onChange={(e) =>
                setNewCollaboration((prev) => ({
                  ...prev!,
                  [e.target.name]: +e.target.value,
                }))
              }
            />
          </NumberInput>
        </FormControl>

        {/* Method */}
        <FormControl className="mt-5">
          <FormLabel>Method</FormLabel>
          <Input
            placeholder="Collaboration Method..."
            name="method"
            value={newCollaboration?.method ?? ""}
            onChange={(e) =>
              setNewCollaboration((prev) => ({
                ...prev!,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </FormControl>

        {/* Note */}
        <FormControl className="mt-5">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Describe your collaboration request..."
            value={newCollaboration?.note ?? ""}
            onChange={(e) =>
              setNewCollaboration((prev) => ({
                ...prev!,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </FormControl>

        <div className="mt-5 flex w-full items-center justify-end gap-5">
          <button
            className="w-40 rounded-md border border-[#cbd5e0] bg-white p-3 font-bold hover:bg-[#b9c2cc]"
            onClick={onBackClick}
          >
            Back
          </button>
          <button
            className="w-40 rounded-md border border-[#cbd5e0] bg-black p-3 font-bold text-white hover:bg-[#b9c2cc]"
            onClick={onCollaborationRequestSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
