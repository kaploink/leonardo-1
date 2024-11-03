import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterFormData, registerFormSchema } from "../register/schema";

const requireRegistrationData = (): RegisterFormData => {
  const cookieStore = cookies();

  try {
    // try to validate and return registration data
    return registerFormSchema.parse(
      JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}"),
    );
    // eslintrc config not working for some reason
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    // incomplete registration data

    // don't bother to log an error; it's a pretty normal use case

    // redirect to get them to fill it in
    redirect("/register");
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // auth check; don't actually need the result here
  // - usually would be a shared func in a separate file but wasn't working.
  requireRegistrationData();

  return children;
}
