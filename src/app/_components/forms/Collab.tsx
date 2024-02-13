"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { api } from "@/trpc/react";

import type { INewCollaborationRequest, IProject } from "@/app/_interfaces";

export default function CollaborationRequestForm({
  ownProjects,
}: {
  ownProjects: IProject[] | undefined;
}) {
  const pathName = usePathname();
  const [representedAs, setRepresentedAs] = useState<string>("");
  const projectId = pathName.split("/").at(-2);
  const router = useRouter();
  const [newCollaboration, setNewCollaboration] =
    useState<INewCollaborationRequest>({
      requested_by: "default",
      collaboration_type: "1",
      wl_spot_amt: 0,
      wl_team_amt: 0,
      method: "",
      note: "",
    });

  const onBackClick = () => {
    router.back();
  };

  const createCollabRequest = api.project.createCollab.useMutation({
    onSuccess: () => {
      router.replace(
        `/home/dashboard/your-creation/${representedAs}/incoming-request`,
      );
    },
  });

  const onCollaborationRequestSubmit = async () => {
    const payload = {
      ...newCollaboration,
      collaboration_type: +newCollaboration?.collaboration_type!,
      project_id: projectId!,
    };

    createCollabRequest.mutate({
      collabReq: payload,
    });
  };

  return (
    <div className="mt-5 flex w-full gap-10">
      <div className="w-full rounded-xl bg-[#FBFBFB] px-5 py-10">
        {/* Collaboration */}
        <FormControl isRequired={true}>
          <FormLabel>Mint Info</FormLabel>
          <RadioGroup
            name="collaboration_type"
            value={newCollaboration?.collaboration_type as string as string}
            onChange={(e: string) =>
              setNewCollaboration((prev) => ({
                ...prev!,
                collaboration_type: e,
              }))
            }
          >
            <div className="flex items-center justify-start gap-20">
              <Radio value="1">Offering WL</Radio>
              <Radio value="2">Requesting WL</Radio>
              <Radio value="3">WL Exchange</Radio>
            </div>
          </RadioGroup>
        </FormControl>

        {/* Represented As */}
        <FormControl isRequired={true} className="mt-5">
          <FormLabel>Represented As</FormLabel>
          <Select
            name="requested_by"
            value={newCollaboration?.requested_by}
            onChange={(e) => {
              setNewCollaboration((prev) => ({
                ...prev!,
                [e.target.name]: e.target.value,
              }));
              setRepresentedAs(e.target.value);
            }}
          >
            <option hidden disabled value="default">
              Select ...
            </option>
            {ownProjects?.map((e, i) => (
              <option value={e.id} key={e.id}>
                {e.project_name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* WL Spot Quantity */}
        <FormControl className="mt-5" isRequired>
          <FormLabel>How Many WL Spot</FormLabel>
          <NumberInput>
            <NumberInputField
              name="wl_spot_amt"
              value={newCollaboration?.wl_spot_amt ?? 0}
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
              name="wl_team_amt"
              value={newCollaboration?.wl_team_amt ?? 0}
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
            name="note"
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
