"use client";

import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Create() {
  const router = useRouter();
  const pathName = usePathname();
  const [link, setLink] = useState<string>("");

  const onSubmitLinkCheck = () => {
    router.push(`${pathName}/${link}`);
  };

  return (
    <>
      {/* Actions */}
      <div className="mt-10 flex h-fit w-full flex-col items-center justify-center gap-4">
        <p>
          Enter the link below to make sure this is a valid website you want to
          visit.
        </p>
        <div className="w-[80%] rounded-md border border-gray-500">
          <InputGroup size="md">
            <Input
              _focus={{ background: "white" }}
              bg="white"
              placeholder="Enter the link you want to check..."
              variant="filled"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <InputRightElement width="5rem">
              <IconButton
                aria-label="Search Link"
                bg="black"
                h="full"
                w="full"
                size="lg"
                borderLeftRadius={0}
                icon={<ArrowForwardIcon color="white" boxSize={8} />}
                onClick={onSubmitLinkCheck}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </>
  );
}
