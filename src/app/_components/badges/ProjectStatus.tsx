export default function ProjectStatusBadge({
  projectStatus,
}: {
  projectStatus?: string;
}) {
  if (projectStatus === "open")
    return (
      <span className="rounded-md bg-[#43936C] p-1 text-xs font-medium uppercase text-white">
        Open
      </span>
    );

  if (projectStatus === "pending")
    return (
      <span className="rounded-md bg-[#DD6B20] p-1 text-xs font-medium uppercase text-white">
        pending
      </span>
    );

  if (projectStatus === "closed")
    return (
      <span className="rounded-md bg-[#E53E3E] p-1 text-xs font-medium uppercase text-white">
        Closed
      </span>
    );
}
