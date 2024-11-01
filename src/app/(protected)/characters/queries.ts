// prevent usage in client code; clarify intended usage
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { registerFormSchema } from "../../register/schema";

export const getRegistrationDataOrRedirect = async (): Promise<{
  username: string;
  jobTitle: string;
}> => {
  const cookieStore = cookies();
  // json parse cookie value
  // const registerInfo = JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}");

  const blah = registerFormSchema.parse({ username: "matt", jobTitle: "Eng" });

  try {
    const data = JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}");
    const parsed = registerFormSchema.parse(data);

    return parsed;
  } catch (e) {
    redirect("/register");
  }
};
