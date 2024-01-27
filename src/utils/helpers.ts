import { differenceInDays, formatDistance, parseISO } from "date-fns";

type GetTodayOptions = {
  end: boolean;
};

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const subtractDates = (startDateStr: string, endDateStr: string) =>
  differenceInDays(parseISO(endDateStr), parseISO(startDateStr));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace("about", "")
    .replace("in", "In");

export const getToday = (options: GetTodayOptions) => {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
