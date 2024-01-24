import supabase, { supabaseUrl } from "./supabase";

export type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
  avatar?: File[] | string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export async function signup({
  email,
  password,
  fullName,
  avatar = "",
}: SignUpParams) {
  console.log(avatar[0]);
  const fileName = `${Math.random()}-avatar-${fullName}`;
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: avatar
          ? `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
          : "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("User could not be signed up");
  }

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (storageError) {
    console.error("Avatar image could not be uploaded. Try again later😢");
    throw new Error(storageError.message);
  }

  return user;
}

export async function login({ email, password }: LoginParams) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Could not log in. Try again later");
    throw new Error(error.message);
  }

  return user;
}

export async function updateCurrentUser() {}
