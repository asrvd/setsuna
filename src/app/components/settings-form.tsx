"use client";

import { useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "../lib/actions";
import { toast } from "sonner";
import { SpinnerIcon } from "./icons/spinner";

export default function SettingsForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  const checkIfDirty = () => {
    const inputs = formRef.current?.querySelectorAll("input");

    if (inputs) {
      setIsDirty(
        Array.from(inputs).some((input) => input.value !== input.defaultValue)
      );
    }
  };

  return (
    <form
      className="flex flex-col gap-3"
      ref={formRef}
      action={async (formData) => {
        await updateProfile(formData);
        toast.success("Settings updated successfully!");
      }}
    >
      <div className="flex lg:flex-row flex-col gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="focus:ring-2 ring-orange-900 border-2 border-orange-300 p-2 bg-orange-50 focus:outline-none"
            defaultValue={name}
            onChange={checkIfDirty}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="focus:ring-2 ring-orange-900 border-2 border-orange-300 p-2 bg-orange-50 focus:outline-none"
            defaultValue={email}
            onChange={checkIfDirty}
          />
        </div>
      </div>
      <SaveBtn isDirty={isDirty} />
    </form>
  );
}

function SaveBtn({ isDirty }: { isDirty: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-orange-900 text-stone-100 px-3 py-2 max-w-max disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending || !isDirty}
    >
      {pending ? (
        <p className="flex items-center gap-2">
          <SpinnerIcon />
          Saving...
        </p>
      ) : (
        "Save"
      )}
    </button>
  );
}
