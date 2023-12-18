/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { XIcon } from "./icons/XIcon";
import { SpinnerIcon } from "./icons/spinner";
import SlideOver from "./ui/slide-over";
import type { CapsuleWithItems } from "./lock-dialog";
import { DownloadIcon } from "./icons/downlod";
import { MaximizeIcon } from "./icons/maximize";
import { LinkIcon } from "./icons/link";
import { CopyIcon } from "./icons/copy";
import ViewNote from "./note-view";

export default function CapsuleContent({
  capsule,
}: {
  capsule: CapsuleWithItems;
}) {
  const [open, setOpen] = useState(false);

  const downloadFileFromURL = async (url: string) => {
    const link = document.createElement("a");
    const res = await fetch(url);
    const file = await res.blob();
    link.href = window.URL.createObjectURL(file);
    // grab the filename from the url
    link.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <button
        className="px-3 py-2 text-base bg-orange-900 text-stone-50 max-w-max"
        onClick={() => setOpen(true)}
      >
        View contents
      </button>
      <SlideOver isOpen={open} closeSlideOver={() => setOpen(false)}>
        <div className="flex flex-col gap-6 font-sans">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-none">{capsule?.name}</h2>
            <button
              className="text-base cursor-pointer text-stone-900 max-w-max focus:outline-none"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full h-full">
            {capsule.items.length > 0 ? (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-6 w-full h-full">
                {capsule?.items.map((item) => (
                  <div
                    className="bg-orange-300/60 w-full justify-between gap-3 aspect-square p-3 flex flex-col font-sans overflow-hidden relative"
                    key={item.id}
                  >
                    <div className="text-sm flex justify-between items-center max-w-full gap-2 text-stone-700 h-[10%]">
                      <span>{item.type} ~</span>

                      <span>
                        {Intl.DateTimeFormat("en-US", {
                          dateStyle: "short",
                        }).format(new Date(item.createdAt))}
                      </span>
                    </div>
                    {item.type === "file" ? (
                      <p className="text-center text-orange-400/60 overflow-hidden h-[80%] w-full flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-32 w-32"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                          >
                            <path d="M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z" />
                            <path stroke-linecap="round" d="M8 10h8m-8 4h5" />
                          </g>
                        </svg>
                      </p>
                    ) : (
                      <p className="flex flex-col gap-3 break-words h-[90%] overflow-hidden">
                        {item.notes}
                      </p>
                    )}
                    <div className="text-sm flex justify-between items-center max-w-full gap-2 text-stone-700 h-[10%]">
                      <span
                        className="w-full truncate"
                        title={
                          item.description ? item.description : "No description"
                        }
                      >
                        {item.description ? item.description : "No description"}
                      </span>
                      <div className="flex gap-1 text-lg items-center">
                        {item.type === "note" ? (
                          <ViewNote note={item.notes as string} />
                        ) : (
                          <a
                            href={item?.mediaUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-stone-900"
                            title="view file"
                          >
                            <LinkIcon />
                          </a>
                        )}
                        {item.type === "note" ? (
                          <button
                            className="max-w-max hover:text-stone-900 focus:outline-none"
                            title="copy note"
                            onClick={() =>
                              navigator.clipboard.writeText(item.notes || "")
                            }
                          >
                            <CopyIcon />
                          </button>
                        ) : (
                          <button
                            className="max-w-max hover:text-stone-900 focus:outline-none"
                            title="copy link"
                            onClick={() =>
                              downloadFileFromURL(item?.mediaUrl as string)
                            }
                          >
                            <DownloadIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full h-full justify-center items-center">
                <img
                  src="https://illustrations.popsy.co/amber/surreal-hourglass.svg"
                  className="h-[400px] w-[400px]"
                  alt="empty-state"
                />
                <h2 className="text-lg font-bold text-center">
                  Nothing to see here yet.{" "}
                </h2>
              </div>
            )}
          </div>
        </div>
      </SlideOver>
    </>
  );
}
