"use client";

import { useFormState } from "react-dom";
import createUser from "./actions";
import { useState } from "react";
import { RegisterFormData } from "./schema";

const initialState = {
  message: "",
};

type FormState<TData, TError> = {
  loading?: boolean;
  data?: TData;
  error?: TError;
};

export default function Register() {
  //   const [state, formAction] = useFormState(createUser, initialState);
  const [formState, setFormState] =
    useState<
      FormState<
        RegisterFormData,
        Record<keyof RegisterFormData, string> | string
      >
    >();

  return (
    <div>
      <form action="/"></form>
    </div>
  );
}
