"use client";

import Modal from "./ui/dialog";
import { useState, useRef } from "react";
import { XIcon } from "./icons/XIcon";
import { SpinnerIcon } from "./icons/spinner";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { lockCapsule } from "../lib/actions";

export type CapsuleWithItems = Prisma.TimeCapsuleGetPayload<{
  include: { items: true };
}>;

export default function LockDialog({ capsule }: { capsule: CapsuleWithItems }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        className="px-3 py-2 text-base bg-orange-900 text-stone-50 max-w-max hover:bg-orange-800 ease-in duration-300"
        onClick={() => setOpen(true)}
      >
        Lock capsule
      </button>
      {capsule.items.length === 0 ? (
        <Modal isOpen={open} closeModal={() => setOpen(false)}>
          <div className="flex flex-col gap-3 font-sans">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold leading-none">
                Capsule Empty!
              </h2>
              <button
                className="text-base text-stone-900 max-w-max focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <p className="text-stone-700">
              You can&apos;t lock an empty capsule. Add some files/notes first!
            </p>
          </div>
        </Modal>
      ) : (
        <Modal isOpen={open} closeModal={() => setOpen(false)}>
          <div className="flex flex-col gap-3 font-sans">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold leading-none">Lock capsule</h2>
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
                const openDate = new Date(formData.get("openDate") as string);
                if (openDate.getDate() < new Date().getDate()) {
                  toast.error("You can't open a capsule in the past or today!");
                  formRef.current?.reset();
                  return;
                }
                formData.append("capsuleId", capsule.id);
                await lockCapsule(formData);
                formRef.current?.reset();
                toast.success("Capsule locked successfully!");
                setOpen(false);
              }}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="title">
                  When do you want to open this capsule?
                </label>
                <input
                  type="date"
                  name="openDate"
                  id="openDate"
                  required
                  placeholder="Give your time capsule a name"
                  className="p-2 outline-none bg-orange-50 focus:ring-2 ring-orange-500 placeholder:text-stone-500"
                />
              </div>
              <SubmitBtn />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-3 py-2 text-base bg-orange-900 text-stone-50 max-w-max"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Locking...</span>
        </p>
      ) : (
        "Lock capsule"
      )}
    </button>
  );
}
