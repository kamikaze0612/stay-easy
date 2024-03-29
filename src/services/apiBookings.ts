import { QueryFeatures } from "../features/bookings/useBookings";
import { Booking } from "../pages/Bookings";
import { BOOKINGS_PER_PAGE, FREEZE_DATE } from "../utils/constants";
import { getISOString, getTomorrow } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }: QueryFeatures) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, status, fee, stay_length, rooms(name), guests(full_name, email)",
      { count: "exact" }
    );

  // FILTERING
  if (filter) query = query.eq(filter.field, filter.value);

  // SORTING
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * BOOKINGS_PER_PAGE;
    const to = from + BOOKINGS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  // QUERYING
  const { data: bookings, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be fetched");
  }

  return { bookings, count };
}

// Returns bookings that are created after given date
// Date must be "ISO String" format
export async function getBookingsAfterDate(date: string) {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("created_at", date)
    .lte("created_at", getISOString(FREEZE_DATE, true));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be fetched");
  }

  return bookings as Booking[];
}

// Returns bookings that are gonna start after given date
// Date must be "ISO String" format
export async function getStaysAfterDate(date: string) {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be fetched");
  }

  return bookings as Booking[];
}

// Returns today's activities
export async function getTodaysActivities() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, flag_icon, nationality)")
    .or(
      `and(status.eq.unconfirmed,start_date.gte.${getISOString(
        FREEZE_DATE
      )},start_date.lt.${getTomorrow(
        FREEZE_DATE
      )}),and(status.eq.confirmed,end_date.gte.${getISOString(
        FREEZE_DATE
      )},end_date.lt.${getTomorrow(FREEZE_DATE)})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be fetched");
  }

  return bookings as Booking[];
}

export async function getBooking(id: string | undefined) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, rooms(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be fetched");
  }

  return booking as Booking;
}

export async function deleteBooking(id: string) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateBooking(id: string, obj: any) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not be checked out");
  }

  return data;
}
