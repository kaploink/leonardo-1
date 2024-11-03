// todo: change chakra direct imports to new copy approach (/ui)
import { Field } from "@/components/ui/field";
import { Button, Input } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { registerAction } from "./actions";
import { RegisterFormData, registerFormSchema } from "./schema";

export const metadata = {
  title: "Register",
};

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

        {/* todo: improve
          - specific errors
          - proactive error reporting (e.g. sentry)
          - styling
          - handle client / network errors
        */}
        {error && (
          <div className="text-red-500">
            Error: unable to save data. Please try again later or contact
            support.
          </div>
        )}

        <Button
          type="submit"
          className="inline w-auto self-end border-2 border-slate-200 px-3 font-medium text-slate-200 hover:bg-slate-200 hover:text-slate-950"
        >
          {username ? "Save" : "Proceed"}
        </Button>
      </form>
    </div>
  );
}
