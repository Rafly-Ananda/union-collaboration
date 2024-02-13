export default function CollabStatusBadge({
  collabStatus,
}: {
  collabStatus?: string;
}) {
  if (collabStatus === "Agreed")
    return (
      <span className="rounded-md bg-[#38A169] p-1 text-xs font-medium uppercase text-white">
        agreed
      </span>
    );

  if (collabStatus === "On Offering")
    return (
      <span className="rounded-md bg-[#DD6B20] p-1 text-xs font-medium uppercase text-white">
        on offering
      </span>
    );

  if (collabStatus === "Rejected")
    return (
      <span className="rounded-md bg-[#E53E3E] p-1 text-xs font-medium uppercase text-white">
        rejected
      </span>
    );
}
