// "use client";

import { Button, Input } from "@chakra-ui/react";
import { registerAction } from "./actions";
import { cookies } from "next/headers";
import { RegisterFormData, registerFormSchema } from "./schema";
import { getRegistrationDataOrRedirect } from "../(protected)/characters/queries";
import { redirect } from "next/navigation";
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";

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
      <form
        action={registerAction}
        className="mx-auto flex max-w-2xl flex-col items-start gap-4 p-8"
      >
        <div>
          <h1 className="text-2xl text-slate-200">{`${username ? "Edit" : "Please enter"} your details`}</h1>
        </div>
        <Field label="Username" className="font-semibold text-slate-400">
          <Input
            placeholder="Enter your username"
            name="username"
            defaultValue={username}
            required
            className="border border-slate-600 bg-transparent px-3 font-normal text-slate-50"
          />
        </Field>
        <Field label="Job title" className="font-semibold text-slate-400">
          <Input
            placeholder="Enter your job title"
            name="jobTitle"
            defaultValue={jobTitle}
            required
            className="border border-slate-600 bg-transparent px-3 font-normal text-slate-50"
          />
        </Field>
        <Button
          type="submit"
          className="inline w-auto self-end border-2 border-slate-200 px-3 font-medium text-slate-200 hover:bg-slate-200 hover:text-slate-950"
        >
          {username ? "Save" : "Proceed"}
        </Button>
        <div className="text-red-500">{error}</div>
      </form>
    </div>
  );
}
