import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/server/validator";
import { dateFormatter } from "@/app/_utils/dateFormatter";
import notFound from "../../../../public/assets/not_found.png";

export default function VerticalShowcaseCard({
  project,
}: {
  project: Project;
}) {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const router = useRouter();
  const onCardClick = () => {
    router.push(`/home/playground/project/${project.id}`);
  };

  const onCollabsClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/home/playground/project/${project.id}/collab`);
  };

  useEffect(() => {
    setIsImageError(false);
  }, []);

  return (
    <div className="flex h-[443px] w-[240px] flex-col rounded-3xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
      <div
        className="relative h-96 w-full rounded-none rounded-t-3xl bg-gray-300"
        onClick={onCardClick}
      >
        <Image
          unoptimized={true}
          src={isImageError ? notFound : project?.logo_url ?? notFound}
          width={300}
          height={300}
          alt="project logo"
          className="absolute h-full w-full rounded-t-3xl object-fill"
          onError={() => setIsImageError(true)}
          blurDataURL="../../../../public/assets/not_found.png"
          placeholder="blur"
        />
      </div>

      <div className="z-10 flex h-full w-full flex-col items-center justify-between gap-4 rounded-b-3xl bg-white px-2 pb-4 pt-2">
        <div className={`h-full w-full text-center`}>
          <h1 className="font-medium">{project.project_name}</h1>
          <p
            className={`w-full text-ellipsis text-justify text-xs text-gray-400 ${project.type === "dao" ? "line-clamp-5" : "line-clamp-2"}`}
          >
            {project.description}
          </p>
        </div>
        <div className="h-fit w-full p-2">
          {project.type === "project" && (
            <div className="flex h-fit w-full flex-col items-center justify-start gap-2 text-[12px]">
              {/* Supply */}
              <div className="flex w-full items-center justify-between">
                <p>Supply</p>
                <span>{project.supply}</span>
              </div>
              {/* Mint Price */}
              <div className="flex w-full items-center justify-between">
                <p>Mint Price</p>
                <span>{project.mint_price}</span>
              </div>
              {/* Mint Date */}
              <div className="flex w-full items-center justify-between">
                <p>Mint Date</p>
                <span>{dateFormatter(project?.mint_date)}</span>
              </div>
            </div>
          )}

          <div className="mt-2 h-[1px] w-full bg-gray-400"></div>
          {/* <p className="mt-2 text-center text-xs text-gray-400">
            66 Requesting
          </p> */}
          <div className="mt-4 flex items-center justify-center">
            <button
              className={`rounded-md bg-black p-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:scale-105 ${project.status === "closed" && "bg-gray-400"}`}
              onClick={onCollabsClick}
              disabled={project.status === "closed" && true}
            >
              Open Collabs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
