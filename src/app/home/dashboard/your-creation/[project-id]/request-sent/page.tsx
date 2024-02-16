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
import { api } from "@/trpc/react";
import CollabStatusBadge from "@/app/_components/badges/CollabStatus";

export default function RequestSent() {
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-2);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: project } = api.project.get.useQuery({ projectId: projectId! });
  const { data: collabRequest, isFetched } = api.collab.getAllSent.useQuery({
    requestedBy: projectId!,
    limit: 100,
  });

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

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/home/dashboard/your-creation/${project?.id}`}
            >
              {project?.project_name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Request Sent</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="my-5 rounded-md bg-white p-6">
        <h6 className="mb-5 flex-none text-lg font-bold">
          Request Sent by {project?.project_name}
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

              {collabRequest?.projects.length! < 1 && (
                <div className="mt-48"></div>
              )}
              <Tbody>
                {isFetched &&
                  collabRequest?.projects.map((e, i) => (
                    <Tr>
                      <Td>
                        <Link href={`${pathName}/${e.id}`}>
                          <button className="rounded-lg border border-[#DD6B20] px-5 py-2 font-semibold text-[#DD6B20] hover:bg-[#DD6B20] hover:text-white">
                            {e.collab_req_from}
                          </button>
                        </Link>
                      </Td>
                      <Td>{e.type}</Td>
                      <Td>{e.wl_spot_amt}</Td>
                      <Td>{e.wl_team_amt}</Td>
                      <Td>{e.method}</Td>
                      <Td>
                        <CollabStatusBadge collabStatus={e.status} />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
