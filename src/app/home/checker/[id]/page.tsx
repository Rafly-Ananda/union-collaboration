import CheckerResult from "@/app/_components/checker/CheckerResult";

export default async function LinkCheckResult({
  params,
}: {
  params: { url: string };
}) {
  const { url } = params;

  return (
    <div className="flex flex-col items-center justify-center">
      <CheckerResult />
    </div>
  );
}
