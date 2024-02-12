export default function MintTypeBadge({ badgeType }: { badgeType?: string }) {
  if (badgeType === "pre-mint")
    return (
      <div className="w-fit rounded-md bg-[#F2994A] bg-opacity-50 p-2 text-sm font-light capitalize text-[#F2994A]">
        {badgeType}
      </div>
    );

  if (badgeType === "post-mint")
    return (
      <div className="w-fit rounded-md bg-[#43936C] bg-opacity-50 p-2 text-sm font-light capitalize text-[#43936C]">
        {badgeType}
      </div>
    );
}
