"use client";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { api } from "@/trpc/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

import HowThisWorksModal from "@/app/_components/modals/HowThisWorks";

export default function LinkSubmit() {
  const pathName = usePathname();
  const pathIdentifier = pathName.split("/").at(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLink, setNewLink] = useState<string>("");

  // const submitLink = api.link.submitLink.useMutation({
  //   onSuccess: () => {
  //     setNewLink("");
  //     setLinkState("Link Checker");
  //   },
  // });

  const onSubmitLink = () => {
    // submitLink.mutate({
    //   url: newLink,
    // });
  };

  return (
    <div className="mt-5 rounded-md bg-white p-6">
      <HowThisWorksModal isOpen={isOpen} onClose={onClose} />
      {/* Link Input */}
      <div className="flex items-center justify-evenly gap-4">
        <h6 className="flex-none text-base font-bold">Submit Link</h6>
        <InputGroup size="md" className="shrink">
          <Input
            placeholder="Enter the link..."
            variant="filled"
            onChange={(e) => setNewLink(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              bg="transparent"
              aria-label="Submit Link"
              icon={<AddIcon color="black" />}
              onClick={onSubmitLink}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <button
          className="flex-none rounded-md border border-gray-500 bg-white p-2 text-sm font-bold"
          onClick={onOpen}
        >
          How This Works
        </button>
      </div>

      {/* Link Request List */}
      <div className="mt-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Website</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <a
                    href="www.elephantunion.com"
                    className="text-[#0A65FF] underline"
                  >
                    foo.com
                  </a>
                </Td>
                <Td>
                  <span className="rounded-md bg-[#38A169] px-2 py-1 text-sm font-medium uppercase text-white">
                    valid
                  </span>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <a
                    href="www.elephantunion.com"
                    className="text-[#0A65FF] underline"
                  >
                    bar.com
                  </a>
                </Td>
                <Td>
                  <span className="rounded-md bg-[#E53E3E] px-2 py-1 text-sm font-medium uppercase text-white">
                    not valid
                  </span>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <a
                    href="www.elephantunion.com"
                    className="text-[#0A65FF] underline"
                  >
                    boo.com
                  </a>
                </Td>
                <Td>
                  <span className="rounded-md bg-[#DD6B20] px-2 py-1 text-sm font-medium uppercase text-white">
                    pending
                  </span>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* Show All */}
      {pathIdentifier !== "submit-link" && (
        <div className="mt-5 flex items-center justify-center">
          <Link
            href={`${pathName}/submit-link`}
            className="rounded-lg border border-black px-4 py-2 text-sm font-bold"
          >
            See All
          </Link>
        </div>
      )}
    </div>
  );
}
