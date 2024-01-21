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
