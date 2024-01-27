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

export type UpdateParams = {
  avatar?: File[];
  fullName?: string;
  password?: string;
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

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data } = await supabase.auth.getUser();

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateParams) {
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // Updating user data
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error("User data could not be updated");
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // Uploading avatar image to database
  const fileName = `${Math.random()}-${data.user.user_metadata.fullName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (storageError) {
    console.error("User avatar could not be updated");
    throw new Error(storageError.message);
  }

  // Update avatar image's path in user's data
  const { data: freshUser, error: secondError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (secondError) {
    throw new Error(secondError.message);
  }

  return { freshUser };
}
