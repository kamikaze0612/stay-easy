import { Room } from "../pages/Rooms";
import supabase from "./supabase";

export async function getRooms() {
  const { data: rooms, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return rooms;
}

export async function createRoom(room: Room) {
  const { data: newRoom, error } = await supabase
    .from("rooms")
    .insert([{ ...room }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Room could not be created");
  }

  return newRoom;
}
