"use client";

import Modal from "./ui/dialog";
import { useState, useRef } from "react";
import { XIcon } from "./icons/XIcon";
import { SpinnerIcon } from "./icons/spinner";
import { toast } from "sonner";
import { addNote } from "../lib/actions";
import { useFormStatus } from "react-dom";

export default function NoteDialog({
  capsuleId,
  disabled,
}: {
  capsuleId: string;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <button
        className="w-full h-full text-lg text-stone-700 disabled:cursor-not-allowed disabled:opacity-50 font-bold flex flex-col gap-1 justify-center items-center"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 h-28 text-orange-300"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"
            />
            <path d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829c-.205.262-.38.547-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-5.965 5.965c-.404.404-.606.606-.829.78a4.59 4.59 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9" />
          </g>
        </svg>
        Add new note
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="flex flex-col gap-3 font-sans">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-none">
              Add a note to your time capsule
            </h2>
            <button
              className="text-base text-stone-900 max-w-max focus:outline-none"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </button>
          </div>
          <form
            className="flex flex-col gap-3"
            ref={formRef}
            action={async (formData) => {
              formData.append("capsuleId", capsuleId);
              await addNote(formData);
              formRef.current?.reset();
              toast.success("Note added successfully!");
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Description (optional)</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="A brief description of your note (optional)"
                className="p-2 outline-none bg-orange-50 focus:ring-2 ring-orange-500 placeholder:text-stone-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Note</label>
              <textarea
                name="notes"
                id="notes"
                required
                placeholder="Your notes..."
                className="p-2 outline-none bg-orange-50 focus:ring-2 ring-orange-500 placeholder:text-stone-500"
              />
            </div>
            <div className="flex justify-start">
              <SubmitBtn />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-3 py-2 text-lg bg-orange-900 hover:bg-orange-800 ease-in duration-300 text-stone-50 max-w-max"
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Adding note...</span>
        </p>
      ) : (
        "Add note"
      )}
    </button>
  );
};
