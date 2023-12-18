"use client";

import Modal from "./ui/dialog";
import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { XIcon } from "./icons/XIcon";
import { SpinnerIcon } from "./icons/spinner";
import Dropzone from "react-dropzone";
import { uploadFile } from "../lib/actions";

export default function UploadDialog({
  capsuleId,
  disabled,
}: {
  capsuleId: string;
  disabled: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        className="w-full h-full text-lg disabled:cursor-not-allowed disabled:opacity-50 text-stone-700 font-bold flex flex-col gap-1 justify-center items-center"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 h-28 text-orange-300"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              fill="currentColor"
              d="m15.393 4.054l-.502.557zm3.959 3.563l-.502.557zm2.302 2.537l-.685.305zM3.172 20.828l.53-.53zm17.656 0l-.53-.53zM14 21.25h-4v1.5h4zM2.75 14v-4h-1.5v4zm18.5-.437V14h1.5v-.437zM14.891 4.61l3.959 3.563l1.003-1.115l-3.958-3.563zm7.859 8.952c0-1.689.015-2.758-.41-3.714l-1.371.61c.266.598.281 1.283.281 3.104zm-3.9-5.389c1.353 1.218 1.853 1.688 2.119 2.285l1.37-.61c-.426-.957-1.23-1.66-2.486-2.79zM10.03 2.75c1.582 0 2.179.012 2.71.216l.538-1.4c-.852-.328-1.78-.316-3.248-.316zm5.865.746c-1.086-.977-1.765-1.604-2.617-1.93l-.537 1.4c.532.204.98.592 2.15 1.645zM10 21.25c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812l-1.06 1.06c.748.75 1.697 1.081 2.869 1.239c1.15.155 2.625.153 4.489.153zM1.25 14c0 1.864-.002 3.338.153 4.489c.158 1.172.49 2.121 1.238 2.87l1.06-1.06c-.422-.424-.676-1.004-.811-2.01c-.138-1.027-.14-2.382-.14-4.289zM14 22.75c1.864 0 3.338.002 4.489-.153c1.172-.158 2.121-.49 2.87-1.238l-1.06-1.06c-.424.422-1.004.676-2.01.811c-1.027.138-2.382.14-4.289.14zM21.25 14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008l1.06 1.06c.75-.748 1.081-1.697 1.239-2.869c.155-1.15.153-2.625.153-4.489zm-18.5-4c0-1.907.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008l-1.06-1.06c-.75.748-1.081 1.697-1.239 2.869C1.248 6.661 1.25 8.136 1.25 10zm7.28-8.75c-1.875 0-3.356-.002-4.511.153c-1.177.158-2.129.49-2.878 1.238l1.06 1.06c.424-.422 1.005-.676 2.017-.811c1.033-.138 2.395-.14 4.312-.14z"
            />
            <path
              stroke="currentColor"
              stroke-width="1.5"
              d="M13 2.5V5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h4"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.5 18.5v-5m0 0l-2 1.875m2-1.875l2 1.875"
            />
          </g>
        </svg>
        Upload a file
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="flex flex-col gap-3 font-sans">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-none">
              Add a file to your time capsule
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
              console.log(file);
              formData.append("file", file as any);
              formData.append("capsuleId", capsuleId);
              console.log(formData.get("file"));
              await uploadFile(formData);
              toast.success("File uploaded!");
              setOpen(false);
              formRef.current?.reset();
              setFile(null);
            }}
          >
            <Dropzone
              onDrop={(acceptedFiles) => {
                console.log(acceptedFiles);
                setFile(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="bg-orange-50 border border-dashed border-orange-500 p-2"
                >
                  <input
                    {...getInputProps()}
                    className="bg-orange-50 w-full h-full"
                  />
                  <p className="text-stone-500">
                    Drag &apos;n&apos; drop some files here, or click to select
                    files (max 20mb)
                  </p>
                </div>
              )}
            </Dropzone>
            {file && (
              <p className="text-stone-500 text-lg -mt-2">
                {file?.name} ({(file?.size / 1024 / 1024).toFixed(2).toString()}{" "}
                mb)
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description (optional)</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Describe your time capsule"
                className="p-2 outline-none bg-orange-50 focus:ring-2 ring-orange-500 placeholder:text-stone-500"
              />
            </div>
            <SubmitBtn />
          </form>
        </div>
      </Modal>
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-3 py-2 text-lg hover:bg-orange-800 ease-in duration-300 bg-orange-900 text-stone-50 max-w-max"
      type="submit"
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Adding file...</span>
        </p>
      ) : (
        "Add file"
      )}
    </button>
  );
}
