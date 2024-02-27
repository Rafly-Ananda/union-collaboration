export const dateFormatter = (
  date: string | null | undefined,
  dateType = "short",
  delimitter = "/",
  isInput = false,
): string => {
  if (date) {
    const d = new Date(date);
    let r = "";
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear().toString();

    if (dateType === "short") {
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      if (!isInput) {
        year.slice(-2);
        r = `${month}${delimitter}${day}${delimitter}${year}`;
      } else {
        r = `${year}${delimitter}${month}${delimitter}${day}`;
      }
    } else {
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const year = d.getFullYear();
      r = `${day} ${month} ${year}`;
    }

    return r;
  }

  return "undefined";
};
