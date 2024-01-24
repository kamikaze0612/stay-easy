import { NewRoom } from "../features/rooms/CreateRoomForm";
import { Room } from "../pages/Rooms";
import supabase, { supabaseUrl } from "./supabase";

export type updateRoomParams = {
  id: string;
  room: Room | NewRoom;
};

export async function getRooms() {
  const { data: rooms, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return rooms;
}

export async function createRoom(room: NewRoom) {
  const imageName = `${String(Math.random())}-${room.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/room_images/${imageName}`;

  const { data: newRoom, error } = await supabase
    .from("rooms")
    .insert([{ ...room, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Room could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("room_images")
    .upload(imageName, room.image);

  if (storageError) {
    await supabase.from("rooms").delete().eq("id", newRoom.id);
    console.error(storageError);
    throw new Error("Image could not be uploaded and room has not created");
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
  let imageName;
  let imagePath;
  if (typeof room.image !== "string") {
    imageName = `${String(Math.random())}-${room.image?.name}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/room_images/${imageName}`;
  } else {
    imagePath = room.image;
  }

  const { data: freshRoom, error } = await supabase
    .from("rooms")
    .update({ ...room, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  console.log(freshRoom);

  if (error) {
    console.error(error);
    throw new Error("Room could not be updated");
  }

  if (!imageName) {
    return freshRoom;
  }

  const { error: storageError } = await supabase.storage
    .from("room_images")
    .upload(imageName, room.image);

  if (storageError) {
    await supabase.from("rooms").delete().eq("id", freshRoom.id);
    console.error(storageError);
    throw new Error("Image could not be uploaded and room has not created");
  }

  return freshRoom;
}
