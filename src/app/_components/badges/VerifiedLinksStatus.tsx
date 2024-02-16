export default function VerifiedLinkStatusBadge({
  status,
}: {
  status?: string;
}) {
  if (status === "approved")
    return (
      <span className="rounded-md bg-[#38A169] px-2 py-1 text-sm font-medium uppercase text-white">
        valid
      </span>
    );

  if (status === "pending")
    return (
      <span className="rounded-md bg-[#DD6B20] px-2 py-1 text-sm font-medium uppercase text-white">
        pending
      </span>
    );

  if (status === "rejected")
    return (
      <span className="rounded-md bg-[#E53E3E] px-2 py-1 text-sm font-medium uppercase text-white">
        pending
      </span>
    );
}
