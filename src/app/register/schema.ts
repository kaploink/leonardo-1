"use server";

import { z } from "zod";

export const registerFormSchema = z.object({
  username: z
    .string({
      required_error: "Please enter a username",
      // we don't strictly require it, but it's more meaningful to the user than saying it's the wrong type
      // - this shouldn't be possible if they use the form though; it should always submit as a string
      invalid_type_error:
        "Please choose a username that starts with a letter (A-Z or a-z)",
    })
    .regex(
      /[A-Za-z0-9_\-\.]+/,
      "Please ensure your username contains only alphanumeric and the following characters: _-.",
    ),
  jobTitle: z
    .string({
      required_error: "Please enter a job title",
      invalid_type_error: "Please enter a valid job title",
    })
    .regex(
      /[A-Za-z0-9_\-\.()]+/,
      "Please ensure your job title contains only alphanumeric and the following characters: _-.()",
    ),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
