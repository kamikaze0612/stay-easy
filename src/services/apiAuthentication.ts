import supabase from "./supabase";

export type signUpParams = {
  email: string;
  password: string;
  fullName: string;
};

export async function signup({ email, password, fullName }: signUpParams) {
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("User could not be signed up");
  }

  return user;
}
