"use client";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { FaXTwitter, FaDiscord, FaGlobe, FaAnglesRight } from "react-icons/fa6";
import {
  FaEdit,
  FaRegWindowClose,
  FaPlay,
  FaRegTrashAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import notFound from "../../../../../../public/assets/not_found.png";
import { dateFormatter } from "@/app/_utils/dateFormatter";
import { useState, useEffect } from "react";
import ProjectStatusBadge from "@/app/_components/badges/ProjectStatus";
import { RxPaperPlane } from "react-icons/rx";
import { useRouter } from "next/navigation";

// Icons
import supplyIcon from "../../../../../../public/assets/supply_icon.png";
import mintDateIcon from "../../../../../../public/assets/mint_date_icon.png";
import wlSlotIcon from "../../../../../../public/assets/wl_slot_icon.png";
import mintPriceIcon from "../../../../../../public/assets/alorand_icon.png";

export default function ProjectViewer() {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const { data: userSession } = useSession();
  const pathName = usePathname();
  const projectId = pathName.split("/").at(-1);
  const router = useRouter();

  const { data, refetch, isLoading, isFetching } = api.project.get.useQuery({
    projectId: projectId!,
  });

  const updateProjectStatus = api.project.editProjectStatus.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const deleteProject = api.project.delete.useMutation({
    onSuccess: () => {
      router.push("/home/dashboard");
    },
  });

  const onCollabsAction = async (projectId: string, status: string) => {
    updateProjectStatus.mutate({
      projectId,
      status,
    });
  };

  const onProjectDelete = async (projectId: string) => {
    deleteProject.mutate({
      projectId,
    });
  };

  useEffect(() => {
    setIsImageError(false);
  }, []);

  return (
    <div>
      <div>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/playground">Playground</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{data?.project_name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="mt-5 flex items-center  justify-between">
        {/* Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">{data?.project_name}</h1>
          <ProjectStatusBadge projectStatus={data?.status} />
        </div>

        {/* Project Actions */}
        <div className="flex items-center gap-4">
          {userSession?.user.extras.id === data?.created_by ? (
            <>
              <Link
                href={`/home/dashboard/your-creation/${projectId}/edit`}
                className=""
              >
                <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-black p-2 text-sm font-semibold text-black transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white ">
                  <FaEdit />
                  Edit
                </button>
              </Link>
              {data?.status === "open" ? (
                <button
                  className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#F2994A] p-2 text-sm font-semibold text-[#F2994A] transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-[#F2994A] hover:text-white"
                  onClick={() => onCollabsAction(projectId!, "closed")}
                >
                  <FaRegWindowClose />
                  Close Collabs
                </button>
              ) : (
                <button
                  className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#319795] p-2 text-sm font-semibold text-[#319795] transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-[#319795] hover:text-white"
                  onClick={() => onCollabsAction(projectId!, "open")}
                >
                  <FaPlay />
                  Open Collabs
                </button>
              )}
              <button
                className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#E53E3E] p-2 text-sm font-semibold text-[#E53E3E] transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-[#E53E3E] hover:text-white"
                onClick={() => onProjectDelete(projectId!)}
              >
                <FaRegTrashAlt />
                Delete Project
              </button>
            </>
          ) : (
            <>
              <Link href={`/home/playground/project/${projectId}/collab`}>
                <button className="rounded-md bg-black px-4 py-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
                  Collabs
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 flex items-start gap-4">
        <div className="h-full w-60 rounded-md bg-white">
          <div className="skeleton relative h-48 w-full rounded-none rounded-t-md">
            <Image
              unoptimized={true}
              src={isImageError ? notFound : data?.logo_url ?? notFound}
              width={300}
              height={300}
              alt="project logo"
              className="absolute h-full w-full rounded-t-md object-fill"
              onError={() => setIsImageError(true)}
              blurDataURL="../../../../public/assets/not_found.png"
              placeholder="blur"
            />
          </div>

          <div className="p-2">
            {isLoading || isFetching ? (
              <div className="my-4 flex items-center justify-center">
                <div className="skeleton h-2 w-28"></div>
              </div>
            ) : (
              <h1 className="mb-2 text-center font-bold">
                {data?.project_name}
              </h1>
            )}
            <Divider />
            <ul className="mt-2 flex items-center justify-center gap-4">
              <li>
                <a href={`https://${data?.twitter}`}>
                  <FaXTwitter color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={`https://${data?.discord}`}>
                  <FaDiscord color="#C2C2C2" />
                </a>
              </li>
              <li>
                <a href={`https://${data?.website}`}>
                  <FaGlobe color="#C2C2C2" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-full w-full grow rounded-md bg-white p-5">
          <h1 className="text-lg font-bold">About Project</h1>
          <p className="mt-5 text-xs font-light">{data?.description}</p>

          {data?.type === "project" && (
            <div className="mt-5 flex w-fit items-center justify-between gap-10">
              <div className="flex items-center gap-2">
                <Image
                  unoptimized={true}
                  src={supplyIcon}
                  alt="supply logo"
                  className="w-6"
                />
                <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                  <span className="text-[#C2C2C2]">{data?.supply}</span>
                  <span>Supply</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  unoptimized={true}
                  src={mintDateIcon}
                  alt="mint date logo"
                  className="w-6"
                />
                <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                  <span className="text-[#C2C2C2]">
                    {dateFormatter(data?.mint_date, "long")}
                  </span>
                  <span>Mint Date</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  unoptimized={true}
                  src={wlSlotIcon}
                  alt="avl wl spot logo"
                  className="w-6"
                />
                <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                  <span className="text-[#C2C2C2]">{data?.avl_wl_spots}</span>
                  <span>Available WL Spot</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  unoptimized={true}
                  src={mintPriceIcon}
                  alt="mint price logo "
                  className="w-6"
                />
                <div className="flex flex-col gap-1 text-sm font-semibold leading-3">
                  <span className="text-[#C2C2C2]">{data?.mint_price}</span>
                  <span>Mint Price</span>
                </div>
              </div>
            </div>
          )}

          {userSession?.user.extras.id === data?.created_by && (
            <>
              <div className="mt-5 flex items-center gap-5">
                {isLoading || isFetching ? (
                  <>
                    <div className="skeleton h-9 w-36 rounded-md"></div>
                    <div className="skeleton h-9 w-28 rounded-md"></div>
                  </>
                ) : (
                  <>
                    {/* Incoming Request Link */}
                    <Link
                      href={`/home/dashboard/your-creation/${data?.id}/incoming-request`}
                    >
                      <div></div>
                      <button
                        className={`flex w-fit items-center justify-center gap-2 rounded-md border border-[#319795] p-2 text-sm font-semibold text-[#319795] hover:bg-[#319795] hover:text-white `}
                      >
                        <FaAnglesRight />
                        Incoming Request
                      </button>
                    </Link>

                    {/* Request Sent Link */}
                    <Link
                      href={`/home/dashboard/your-creation/${data?.id}/request-sent`}
                    >
                      <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#F2994A] p-2 text-sm font-semibold text-[#F2994A] hover:bg-[#F2994A] hover:text-white">
                        <RxPaperPlane />
                        Request Sent
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
