import { Settings } from "../features/settings/UpdateSettingsForm";
import supabase from "./supabase";

export const getSettings = async () => {
  const { data: settings, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be fetched");
  }

  return settings as Settings[];
};

export const updateSettings = async (freshData: Settings) => {
  const { data: freshSettings, error } = await supabase
    .from("settings")
    .update(freshData)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be updated");
  }

  return freshSettings;
};
