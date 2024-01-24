import { QueryFeatures } from "../features/bookings/useBookings";
import { Booking } from "../pages/Bookings";
import { BOOKINGS_PER_PAGE } from "../utils/constants";
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
