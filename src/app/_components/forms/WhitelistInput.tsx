"use client";
import {
  Divider,
  Textarea,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import type { InewWhitelistInput, EWhitelistType } from "@/app/_interfaces";

import { IProject, ICollaborationRequest } from "@/app/_interfaces";

export default function WhitelistInputForm({
  requester,
  receiver,
  collabDetail,
  requestType,
  whiteListReq,
  setWhitelistReq,
  onWhitelistSubmit,
}: {
  requester: IProject | undefined;
  receiver: IProject | undefined;
  collabDetail: ICollaborationRequest | undefined;
  requestType: string;
  whiteListReq: InewWhitelistInput | undefined;
  setWhitelistReq: React.Dispatch<
    React.SetStateAction<InewWhitelistInput | undefined>
  >;
  onWhitelistSubmit: () => void;
}) {
  return (
    <div className="h-full w-full rounded-md bg-white p-6">
      <h6 className="mb-2 flex-none text-base font-bold">Whitelist Input</h6>
      <Divider />
      <div className="mt-5 w-full">
        <div className="mb-5">
          <h6 className="text-sm font-semibold">Submitted Whitelist:</h6>
          <ul className="mt-2 text-sm text-gray-400">
            {collabDetail?.type === "Offering WL" && (
              <>
                <li>General Whitelist (Apply to {requester?.project_name}):</li>
                <li>Team Whitelist (Apply to {requester?.project_name}):</li>
              </>
            )}

            {collabDetail?.type === "Requesting WL" && (
              <>
                <li>General Whitelist (Apply to {receiver?.project_name}):</li>
                <li>Team Whitelist (Apply to {receiver?.project_name}):</li>
              </>
            )}

            {collabDetail?.type === "WL Exchange" && (
              <>
                <li>General Whitelist (Apply to {receiver?.project_name}):</li>
                <li>Team Whitelist (Apply to {receiver?.project_name}):</li>
                <li className="mt-2">
                  General Whitelist (Apply to {requester?.project_name}):
                </li>

                <li>Team Whitelist (Apply to {requester?.project_name}):</li>
              </>
            )}
          </ul>
        </div>

        {requestType === "incoming"
          ? collabDetail?.type !== "Requesting WL" && (
              <>
                {/* Whitelist Type */}
                <FormControl isRequired={true}>
                  <FormLabel>Whitelist Type</FormLabel>
                  <RadioGroup
                    name="whitelist_type"
                    value={whiteListReq?.whitelist_type ?? ""}
                    onChange={(e: string) =>
                      setWhitelistReq((prev) => ({
                        ...prev!,
                        whitelist_type: e,
                      }))
                    }
                  >
                    <div className="flex items-center justify-start gap-20">
                      <Radio value="1">General Whitelist</Radio>
                      <Radio value="2">Team Whitelist</Radio>
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Input Whitelist */}
                <FormControl className="mt-5" isRequired={true}>
                  <FormLabel>Input Whitelist</FormLabel>
                  <Textarea
                    name="whitelisted_user"
                    placeholder="Input Whitelist..."
                    value={whiteListReq?.whitelisted_user ?? ""}
                    onChange={(e) =>
                      setWhitelistReq((prev) => ({
                        ...prev!,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </FormControl>

                <div className="mt-5 flex w-full items-center justify-end">
                  <button
                    className="rounded-md bg-black px-4 py-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
                    onClick={onWhitelistSubmit}
                  >
                    Apply Role
                  </button>
                </div>
              </>
            )
          : collabDetail?.type !== "Offering WL" && (
              <>
                {/* Whitelist Type */}
                <FormControl isRequired={true}>
                  <FormLabel>Whitelist Type</FormLabel>
                  <RadioGroup
                    name="whitelist_type"
                    value={whiteListReq?.whitelist_type ?? ""}
                    onChange={(e: string) =>
                      setWhitelistReq((prev) => ({
                        ...prev!,
                        whitelist_type: e as EWhitelistType,
                      }))
                    }
                  >
                    <div className="flex items-center justify-start gap-20">
                      <Radio value="general-wl">General Whitelist</Radio>
                      <Radio value="team-wl">Team Whitelist</Radio>
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Input Whitelist */}
                <FormControl className="mt-5" isRequired={true}>
                  <FormLabel>Input Whitelist</FormLabel>
                  <Textarea
                    name="whitelisted_user"
                    placeholder="Input Whitelist..."
                    value={whiteListReq?.whitelisted_user ?? ""}
                    onChange={(e) =>
                      setWhitelistReq((prev) => ({
                        ...prev!,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </FormControl>

                <div className="mt-5 flex w-full items-center justify-end">
                  <button
                    className="rounded-md bg-black px-4 py-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
                    onClick={onWhitelistSubmit}
                  >
                    Apply Role
                  </button>
                </div>
              </>
            )}
      </div>
    </div>
  );
}
