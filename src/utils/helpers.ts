import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const subtractDates = (startDateStr: string, endDateStr: string) =>
  differenceInDays(parseISO(startDateStr), parseISO(endDateStr));

export const formatDistanceFromNow = (dateStr: string) => {
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace("about", "")
    .replace("in", "In");
};
