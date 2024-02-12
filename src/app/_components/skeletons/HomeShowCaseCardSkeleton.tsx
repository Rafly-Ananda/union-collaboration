export default function VerticalShowcaseCardSkeleton() {
  return (
    <div className="skeleton flex h-[443px] w-[240px] flex-col gap-4 rounded-3xl bg-[#b2b3b3]">
      <div className="skeleton h-56 w-full rounded-none rounded-t-3xl"></div>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-6 w-40"></div>

        <div className="skeleton h-2 w-4/5"></div>
        <div className="skeleton h-2 w-4/5"></div>
        <div className="skeleton h-2 w-4/5"></div>
      </div>

      <div className="flex items-center justify-center">
        <div className="skeleton h-6 w-20"></div>
      </div>
    </div>
  );
}
