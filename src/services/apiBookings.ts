import { Booking } from "../pages/Bookings";
import supabase from "./supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, start_date, end_date, status, fee, stay_length, rooms(name), guests(full_name, email)"
    );

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be fetched");
  }

  return bookings;
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
