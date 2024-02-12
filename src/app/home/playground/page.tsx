"use client";
import localFont from "next/font/local";
import { useState } from "react";
import {
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Divider,
  Center,
} from "@chakra-ui/react";
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import VerticalShowcaseCard from "@/app/_components/cards/HomeShowcaseCard";
import VerticalShowcaseCardSkeleton from "@/app/_components/skeletons/HomeShowCaseCardSkeleton";
import { api } from "@/trpc/react";
import { CLIENT_CONFIG } from "@/app/_config/config";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});
const projectFilter: string[] = ["Pre Mint", "Post Mint", "DAO"];

export default function Playground() {
  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isError } = api.project.getAll.useQuery({
    page: 1,
    pageSize: CLIENT_CONFIG.PAGINATION_LIMIT,
  });

  // const { data, fetchNextPage, isLoading, isFetchingNextPage } =
  //   api.project.getPaginate.useInfiniteQuery(
  //     {
  //       limit: paginationLimit,
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     },
  //   );

  // const { data: projectsPaginationQuery } = api.project.getTotalPage.useQuery({
  //   limit: paginationLimit,
  // });

  const handleFetchNextPage = () => {
    // if (projectsPaginationQuery?.totalPage === page + 1) return;
    // fetchNextPage();
    // setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    // if (page === 0) return;
    // setPage((prev) => prev - 1);
  };

  // const onCollabsClick = async () => {
  //   return;
  // };

  return (
    <>
      {/* Dashboard Navigation */}
      <div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 ">
          <h1 className={`${graphik.className} text-5xl font-bold`}>
            Playground
          </h1>
          <p className="opacity-50">Make Collaboration Easier.</p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 p-2">
          <ul className="flex flex-none items-center justify-center gap-4">
            {projectFilter.map((e, i) => (
              <li className="font-medium" key={e + i}>
                {e}
              </li>
            ))}
          </ul>

          <Center height="25px">
            <Divider orientation="vertical" borderColor="black" />
          </Center>

          <div className="w-[40vw]">
            <InputGroup size="sm" className="shrink">
              <InputLeftElement>
                <IconButton
                  bg="transparent"
                  aria-label="Submit Link"
                  icon={<SearchIcon color="black" />}
                  // onClick={onSubmitLink}
                />
              </InputLeftElement>
              <Input
                placeholder="Search"
                variant="filled"
                borderRadius="5px"
                bg="white"
                // onChange={(e) => setNewLink(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="w-fit">
            <Select borderColor="black" size="sm" borderRadius="5px">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="sort-asc">Sort A-Z</option>
              <option value="sort-desc">Sort Z-A</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Project Showcase */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
        {isLoading || isError
          ? Array.from({ length: CLIENT_CONFIG.PAGINATION_LIMIT }).map(
              (_, i) => <VerticalShowcaseCardSkeleton key={i} />,
            )
          : data?.projects.map((e, i) => (
              <VerticalShowcaseCard key={i} project={e} />
            ))}
      </div>

      {/* Project Showcase Pagination */}
      <div className="mt-10 flex w-full items-center justify-center gap-10">
        {isLoading || isError ? (
          <>
            <div className="skeleton h-14 w-14 rounded-full"></div>
            <div className="skeleton h-14 w-14 rounded-full"></div>{" "}
          </>
        ) : (
          <>
            <IconButton
              aria-label="previous button"
              bg="black"
              h="full"
              w="fit-content"
              size="sm"
              isRound={true}
              padding="15px"
              icon={<ArrowBackIcon color="white" boxSize={6} />}
              onClick={handleFetchPreviousPage}
            ></IconButton>
            <IconButton
              aria-label="next button"
              bg="black"
              h="full"
              w="fit-content"
              size="sm"
              isRound={true}
              padding="15px"
              icon={<ArrowForwardIcon color="white" boxSize={6} />}
              onClick={handleFetchNextPage}
            ></IconButton>
          </>
        )}
      </div>
    </>
  );
}
