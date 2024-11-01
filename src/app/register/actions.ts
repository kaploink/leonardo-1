"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const schema = z.object({
  username: z.string({
    invalid_type_error: "Please enter a valid username",
  }),
  jobTitle: z.string({
    invalid_type_error: "Please enter a valid job title",
  }),
});

export default async function register(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  const parseResult = schema.safeParse(formDataObject);

  // Return early if the form data is invalid
  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  // Save the data in HTTP-only cookies to ensure security
  const cookieStore = cookies();
  cookieStore.set("registerInfo", JSON.stringify(parseResult.data), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  redirect("/dashboard");
}
