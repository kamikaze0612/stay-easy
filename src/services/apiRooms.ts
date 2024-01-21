import { Room } from "../pages/Rooms";
import supabase from "./supabase";

export type updateRoomParams = {
  id: string;
  room: Room;
};

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

export async function deleteRoom(id: string) {
  const { error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Room could not be deleted");
  }
}

export async function updateRoom({ id, room }: updateRoomParams) {
  const { data: freshRoom, error } = await supabase
    .from("rooms")
    .update(room)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Room could not be updated");
  }

  return freshRoom;
}
