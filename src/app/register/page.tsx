// "use client";

import { Button, Input } from "@chakra-ui/react";
import { registerAction } from "./actions";
import { cookies } from "next/headers";
import { RegisterFormData, registerFormSchema } from "./schema";
import { getRegistrationDataOrRedirect } from "../(protected)/characters/queries";
import { redirect } from "next/navigation";

// const initialState = {
//   message: "",
// };

// type FormState<TData, TError> = {
//   loading?: boolean;
//   data?: TData;
//   error?: TError;
// };

export const metadata = {
  title: "Register",
};

// // Define the action function for form submission
// async function registerAction(formData: FormData) {
//   "use server";

//   const name = formData.get("username") as string;
//   const jobTitle = formData.get("job_title") as string;

//   // Handle form data here, e.g., save to the database
//   console.log("Name:", name, "Job title:", jobTitle);

//   // Redirect or handle after form submission
//   return redirect("/characters"); // redirect to a success page
// }

const getRegistrationDataOrUndefined = (): RegisterFormData | undefined => {
  const cookieStore = cookies();

  const parseResult = registerFormSchema.safeParse(
    JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}"),
  );

  return parseResult.data;
};

export default function Register({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const { username, jobTitle } = getRegistrationDataOrUndefined() ?? {};

  //   const [state, formAction] = useFormState(createUser, initialState);
  // const [formState, setFormState] =
  //   useState<
  //     FormState<
  //       RegisterFormData,
  //       Record<keyof RegisterFormData, string> | string
  //     >
  //   >();
  const error = searchParams?.error; // Use error from server response if it exists

  return (
    <div>
      <form action={registerAction}>
        <Input
          placeholder="Username"
          name="username"
          value={username}
          required
        />
        <Input
          placeholder="Job title"
          name="jobTitle"
          value={jobTitle}
          required
        />
        <Button type="submit" className="bg-slate-50">
          Submit
        </Button>
        <div className="text-red-500">{error}</div>
      </form>
    </div>
  );
}
