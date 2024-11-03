// prevent usage in client code; clarify intended usage
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerFormSchema } from "../../register/schema";

export const getRegistrationDataOrRedirect = async (): Promise<{
  username: string;
  jobTitle: string;
}> => {
  const cookieStore = cookies();

  try {
    const data = JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}");
    const parsed = registerFormSchema.parse(data);

    return parsed;
    // eslintrc config not working for some reason
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    redirect("/register");
  }
};
