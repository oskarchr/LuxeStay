"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateEmail(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;

  // Ensure the email is new
  if (email) {
    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      redirect("/error"); // Redirect to an error page on failure
    }

    // Revalidate the profile or user-dependent page
    redirect("/profile"); // Replace with your redirect path
  }
}

// Update Password
export async function updatePassword(formData: FormData) {
  const supabase = createClient();

  const password = formData.get("password") as string;

  // Update password if provided
  if (password) {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      redirect("/error"); // Redirect to an error page on failure
    }

    redirect("/profile"); // Replace with your redirect path
  }
}
