import { isFuture, isPast, isToday } from "date-fns";

import supabase from "../services/supabase";
import { guests } from "../data/data-guests";
import { rooms } from "../data/data-rooms";
import { BookingDevData, bookings } from "../data/data-bookings";
import { subtractDates } from "../utils/helpers";
import { Settings } from "../features/settings/UpdateSettingsForm";

export async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);

  if (error) {
    console.error(error);
    throw new Error("Guests could not be deleted");
  }
}

export async function deleteRooms() {
  const { error } = await supabase.from("rooms").delete().gt("id", 0);

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be deleted");
  }
}

export async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be deleted");
  }
}

export async function apiCreateGuests() {
  const { error } = await supabase.from("guests").insert(guests);

  if (error) {
    console.error(error);
    throw new Error("Guests could not be created");
  }
}

export async function apiCreateRooms() {
  const { error } = await supabase.from("rooms").insert(rooms);

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be created");
  }
}

export async function apiCreateBookings() {
  const { data } = await supabase.from("settings").select("*");
  const settings = data as unknown as Settings[];

  const { data: guestIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const allGuestIds = guestIds?.map((guest) => guest.id);

  const { data: roomIds } = await supabase
    .from("rooms")
    .select("id")
    .order("id");

  const allRoomIds = roomIds?.map((room) => room.id);

  const finalBookings = bookings.map((booking: BookingDevData) => {
    const room = rooms[booking.room_id - 1];

    const stay_length = subtractDates(booking.start_date, booking.end_date);

    const room_total_price = stay_length * room.price;
    const extras_total_price = booking.has_breakfast
      ? stay_length * +settings?.[0]?.breakfast_price * +booking.guests_num
      : 0;

    const fee = room_total_price + extras_total_price;

    let status = "";
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "confirmed";

    return {
      ...booking,
      fee,
      room_total_price,
      extras_total_price,
      guest_id: allGuestIds?.[booking.guest_id - 1],
      room_id: allRoomIds?.[booking.room_id - 1],
      status,
      stay_length,
    };
  });

  console.log(finalBookings);

  const { error: createBookingsError } = await supabase
    .from("bookings")
    .insert(finalBookings);

  if (createBookingsError) {
    console.error(createBookingsError);
    throw new Error("Bookings could not be created");
  }
}
