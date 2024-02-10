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

interface p {
  link: string;
  status: string;
}

const deleteMeLater = Array.from({ length: 10 }, () => ({
  link: `https://${Math.random().toString(36).substr(2, 8)}.com`,
  status: "valid",
}));

const pageSize = 5;

function paginate(array: p[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

export default function LinkSubmit() {
  const pathName = usePathname();
  const pathIdentifier = pathName.split("/").at(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLink, setNewLink] = useState<string>("");
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const itemForPage = paginate(deleteMeLater, paginationPage, pageSize);

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

  const onNextPage = () => {
    setPaginationPage((p) => p + 1);
  };

  const onPrevPage = () => {
    if (paginationPage === 1) return;
    setPaginationPage((p) => p - 1);
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
              {itemForPage.map((e, i) => (
                <Tr key={i}>
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
              ))}
              {/* <Tr>
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
              </Tr> */}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* Show All */}
      {pathIdentifier !== "submit-link" ? (
        <div className="mt-5 flex items-center justify-center">
          <Link
            href={`${pathName}/submit-link`}
            className="rounded-lg border border-black px-4 py-2 text-sm font-bold"
          >
            See All
          </Link>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <div className="join mt-5">
            <button className="join-item btn bg-[#F3F4F6]" onClick={onPrevPage}>
              «
            </button>
            <button className="join-item btn bg-[#F3F4F6]">
              Page {paginationPage}
            </button>
            <button className="join-item btn bg-[#F3F4F6]" onClick={onNextPage}>
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
