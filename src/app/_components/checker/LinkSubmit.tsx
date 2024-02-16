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
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import HowThisWorksModal from "@/app/_components/modals/HowThisWorks";
import { VerifiedLinks } from "@/server/validator";
import VerifiedLinkStatusBadge from "@/app/_components/badges/VerifiedLinksStatus";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

export default function LinkSubmit() {
  const { data: user } = useSession();
  const externalUser = user?.user.extras;
  const pathName = usePathname();
  const pathIdentifier = pathName.split("/").at(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLink, setNewLink] = useState<string>("");
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const { data: links, refetch } = api.user.getAllVerReqLinks.useQuery({
    page: 1,
    pageSize: 10,
    externalUserId: externalUser?.id,
  });

  const submitLink = api.user.createVerifiedLink.useMutation({
    onSuccess: () => {
      setNewLink("");
      refetch();
    },
  });

  const onSubmitLink = () => {
    submitLink.mutate({
      url: newLink,
    });
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
            value={newLink}
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

      {links?.data.length! < 1 ? (
        <>
          <div className="mt-5 flex items-center justify-center">
            <h6 className="flex-none text-base font-light underline">
              You curently don't have any verified links, submit them here!
            </h6>
          </div>
        </>
      ) : (
        <>
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
                  {pathName.split("/").at(-1) === "dashboard" ? (
                    <>
                      {links?.data.slice(0, 3).map((e, i) => (
                        <Tr key={i}>
                          <Td>
                            <a
                              href="www.elephantunion.com"
                              className="text-[#0A65FF] underline"
                            >
                              {e.url}
                            </a>
                          </Td>
                          <Td>
                            <VerifiedLinkStatusBadge status={e.status} />
                          </Td>
                        </Tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {links?.data.map((e, i) => (
                        <Tr key={i}>
                          <Td>
                            <a
                              href="www.elephantunion.com"
                              className="text-[#0A65FF] underline"
                            >
                              {e.url}
                            </a>
                          </Td>
                          <Td>
                            <VerifiedLinkStatusBadge status={e.status} />
                          </Td>
                        </Tr>
                      ))}
                    </>
                  )}
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
                <button
                  className="btn join-item bg-[#F3F4F6]"
                  onClick={onPrevPage}
                >
                  «
                </button>
                <button className="btn join-item bg-[#F3F4F6]">
                  Page {paginationPage}
                </button>
                <button
                  className="btn join-item bg-[#F3F4F6]"
                  onClick={onNextPage}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
