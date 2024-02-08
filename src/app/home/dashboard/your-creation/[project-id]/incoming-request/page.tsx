"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
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
} from "@chakra-ui/react";
import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function IncomingRequest() {
  const pathName = usePathname();
  const projectIdentifier = pathName.split("/").at(-2);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSubmitSearchQuery = async () => {
    console.log(searchQuery);
  };

  return (
    <section>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/home/dashboard/your-creation">
              Your Creation
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Incoming Request</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="my-5 rounded-md bg-white p-6">
        <h6 className="mb-5 flex-none text-lg font-bold">
          Incoming Collaboration Request
        </h6>
        <Divider />
        <div className="mt-5 w-full">
          <InputGroup size="md" className="shrink">
            <Input
              placeholder="Enter the link..."
              variant="filled"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                bg="transparent"
                aria-label="Submit Link"
                icon={<SearchIcon color="black" />}
                onClick={onSubmitSearchQuery}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </div>

        {/* Collab Request List */}
        <div className="mt-5">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>PROJECT NAME</Th>
                  <Th>COLLABORATION</Th>
                  <Th>WL SPOTS</Th>
                  <Th>WL TEAMS</Th>
                  <Th>METHOD</Th>
                  <Th>STATUS</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Link href={`${pathName}/1`}>
                      <button className="rounded-lg border border-[#319795] px-5 py-2 font-semibold text-[#319795] hover:bg-[#319795] hover:text-white">
                        Quantum Breaker
                      </button>
                    </Link>
                  </Td>
                  <Td>Offering WL</Td>
                  <Td>20</Td>
                  <Td>10</Td>
                  <Td>Lorem Ipsum</Td>
                  <Td>
                    <span className="rounded-md bg-[#38A169] px-2 py-1 font-medium uppercase text-white">
                      agreed
                    </span>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
