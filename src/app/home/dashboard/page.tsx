import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import LinkSubmit from "@/app/_components/checker/LinkSubmit";
import YourCreationCard from "@/app/_components/cards/YourCreationCard";
import contactSupportLogo from "../../../../public/assets/contact_support_logo.png";
import createProjectEmblem from "../../../../public/assets/create_project_emblem.png";
import createDaoEmblem from "../../../../public/assets/create_dao_emblem.png";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

const graphik = localFont({
  src: "../../../../public/fonts/Graphik.otf",
  display: "swap",
});

export default async function Dashboard() {
  const session = await getServerAuthSession();
  const userExternal = session?.user.extras.id;

  const projects = await api.project.getAll.query({
    page: 1,
    pageSize: 3,
    externalUserId: userExternal,
  });

  return (
    <section className="w-full">
      {/* Title */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className={`${graphik.className} text-5xl font-bold`}>
            Hi, {session?.user.name}
          </h1>
          <p className="mt-2">
            Welcome to the Dashboard, this is where you create and control
            everything
          </p>
        </div>

        <button className="rounded-lg bg-[#D2D2D2] p-2 text-sm font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <Image
            src={contactSupportLogo}
            alt="Contact Admin"
            className="mr-2 inline w-5"
          />
          Contact Admin
        </button>
      </div>

      {/* Create Project n DAO */}
      <div className="mt-5 flex w-full items-center justify-center gap-6">
        {/* Create Project */}
        <Link href="/home/dashboard/create/project" className="w-full">
          <div className="flex w-full items-center justify-between rounded-md bg-[#00DF8E] p-6 transition delay-150 duration-300 ease-in-out hover:-translate-y-2">
            <div>
              <h1 className="text-xl font-bold">Create Project</h1>
              <p className="w-[80%] text-sm">
                Create a project where you will collaborate with others
              </p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <Image
                src={createProjectEmblem}
                alt="Create Project"
                className="w-7"
              />
            </div>
          </div>
        </Link>
        {/* Create DAO */}
        <Link href="/home/dashboard/create/dao" className="w-full">
          <div className="flex w-full items-center justify-between rounded-md bg-[#FFBE0B] p-6 transition delay-150 duration-300 ease-in-out hover:-translate-y-2">
            <div>
              <h1 className="text-xl font-bold">Create DAO</h1>
              <p className="w-[80%] text-sm">
                Create a DAO where you will collaborate with others
              </p>
            </div>

            <div className="rounded-xl bg-white p-3">
              <Image src={createDaoEmblem} alt="Create Dao" className="w-10" />
            </div>
          </div>
        </Link>
      </div>

      {/* Submit Link */}
      <LinkSubmit />

      {/* Your Creation */}
      <div className="my-5 rounded-md bg-white p-6">
        <h6 className="flex-none text-base font-bold">Your Creation</h6>
        {projects?.projects?.length! < 1 ? (
          <>
            <div className="mt-5 flex items-center justify-center">
              <h6 className="flex-none text-base font-light underline">
                You curently have no Project's/Dao's go ahead and create one of
                them!
              </h6>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 w-full">
              {projects?.projects.map((e, i) => (
                <YourCreationCard key={i} project={e} />
              ))}
            </div>
            {/* Show All */}
            <div className="mt-5 flex items-center justify-center">
              <Link
                href={`/home/dashboard/your-creation`}
                className="rounded-lg border border-black px-4 py-2 text-sm font-bold"
              >
                See All
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
