// prevent usage in client code; clarify intended usage
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerFormSchema } from "./schema";

export async function registerAction(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  const parseResult = registerFormSchema.safeParse(formDataObject);

  // Return early if the form data is invalid
  if (!parseResult.success) {
    console.error("invalid", parseResult.error.flatten());

    // hack until Next support for server rendered forms is finalised (add ability to return errors under a stable release)
    // - in practice we may keep using client side ones until then instead
    return redirect("/register?error=invalid_form_data");
  }

  // Save the data in HTTP-only cookies to ensure security
  const cookieStore = cookies();
  cookieStore.set("registerInfo", JSON.stringify(parseResult.data), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // all good, redirect them to what they want to see
  return redirect("/characters");
}
