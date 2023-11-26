import { parseISO, format } from "date-fns";

export const FormattedDate = ({ date }: { date: string }) => {
  const isoDate = parseISO(date);
  return <time dateTime={date}>{format(isoDate, "LLLL	d, yyyy")}</time>;
};
