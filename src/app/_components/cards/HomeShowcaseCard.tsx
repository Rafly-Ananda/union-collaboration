import Link from "next/link";
import Image from "next/image";
import deleteMeLater from "../../../../public/assets/delete_me_later.png";

export default function VerticalShowcaseCard() {
  const onCollabsClick = () => {
    console.log("Collabs");
  };

  return (
    <div className="flex h-fit w-[240px] flex-col rounded-3xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
      <div className="relative  h-48  w-full ">
        <Image
          src={deleteMeLater}
          alt="de logo"
          className=" absolute rounded-t-3xl object-fill"
        />
      </div>

      <div className="z-10 flex h-full w-full flex-col items-center justify-start gap-4 rounded-b-3xl bg-white px-2 pb-4 pt-2">
        <div className="text-center">
          <h1 className="font-medium">Zeel Den</h1>
          <p className="w-full text-ellipsis text-xs text-gray-400">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium
          </p>
        </div>
        <div className="h-full w-full p-2">
          <div className="flex h-fit w-full flex-col items-center justify-start gap-2 text-[12px]">
            {/* Supply */}
            <div className="flex w-full items-center justify-between">
              <p>Supply</p>
              <span>20</span>
            </div>
            {/* Mint Price */}
            <div className="flex w-full items-center justify-between">
              <p>Mint Price</p>
              <span>TBA</span>
            </div>
            {/* Mint Date */}
            <div className="flex w-full items-center justify-between">
              <p>Mint Date</p>
              <span>TBA</span>
            </div>
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-400"></div>
          <p className="mt-2 text-center text-xs text-gray-400">
            66 Requesting
          </p>
          <div className="mt-2 flex items-center justify-center">
            <Link href="/home/playground/project/1">
              <button
                className="rounded-md bg-black p-2 text-sm text-white transition delay-150 duration-300 ease-in-out hover:scale-105"
                onClick={onCollabsClick}
              >
                Open Collabs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
