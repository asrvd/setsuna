import Navbar from "@/app/components/navbar";
import { db } from "@/app/lib/db";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import UploadDialog from "@/app/components/upload-dialog";
import NoteDialog from "@/app/components/note-dialog";
import LockDialog from "@/app/components/lock-dialog";
import CapsuleCountdown from "@/app/components/countdown";
import CapsuleContent from "@/app/components/capsule-content";
import Footer from "@/app/components/footer";

async function getCapsuleData(id: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const capsule = await db.timeCapsule.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
  return capsule;
}

export default async function Page({ params }: { params: { id: string } }) {
  const capsule = await getCapsuleData(params.id);
  if (!capsule) {
    redirect("/");
  }
  return (
    <main className="bg-orange-100 font-sans flex flex-col items-center min-h-screen min-w-screen gap-4 overflow-x-hidden">
      <Navbar page="Capsule" />
      <section className="lg:w-2/3 md:w-4/5 pt-8 lg:pt-12 p-4 lg:p-0 flex flex-col gap-6 w-full min-h-screen">
        <div className="flex w-full flex-col lg:flex-row gap-3 justify-between lg:items-center">
          <h2 className="lg:text-3xl text-xl font-bold">{capsule?.name}</h2>
          {!capsule.locked ? (
            <div className="flex gap-3 items-center">
              <LockDialog capsule={capsule} />
              <CapsuleContent capsule={capsule} />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {capsule.locked && (
                <span className="text-sm text-stone-700">
                  Time until capsule can be opened ~
                </span>
              )}
              <CapsuleCountdown
                openingDate={capsule?.openingDate as Date}
                capsuleId={capsule?.id as string}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p>{capsule?.description}</p>
          <div className="flex lg:flex-row flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
              <div className="bg-orange-200/90 w-full aspect-square p-4 flex flex-col justify-center font-sans overflow-hidden relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-20 z-0 -right-28 text-orange-300 w-60 h-60"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M224 160V48a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-48ZM208 48v92.7L179.3 112a16.1 16.1 0 0 0-22.6 0L112 156.7L91.3 136a16.1 16.1 0 0 0-22.6 0L48 156.7V48Zm0 160H48v-28.7l32-32l20.7 20.7a16.1 16.1 0 0 0 22.6 0l44.7-44.7l40 40V208ZM91.5 100.5A11.9 11.9 0 0 1 88 92a12 12 0 0 1 24 0a12 12 0 0 1-12 12a12.3 12.3 0 0 1-8.5-3.5Z"
                  />
                </svg>
                <h2 className="text-8xl font-black leading-none z-10">
                  {capsule?.items
                    .filter((item) => item.type === "file")
                    .length.toString()
                    .padStart(2, "0")}
                </h2>
                <p className="text-3xl font-bold z-10 text-stone-700">
                  {capsule?.items.filter((item) => item.type === "file")
                    .length === 1
                    ? "File"
                    : "Files"}
                </p>
              </div>
              <div className="bg-orange-200/90 w-full aspect-square p-4 flex flex-col justify-center font-sans relative overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="absolute -bottom-20 z-0 -right-28 text-orange-300 w-60 h-60"
                >
                  <path
                    fill="currentColor"
                    d="M168 128a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-8 24H96a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16Zm56-104v152a32.1 32.1 0 0 1-32 32H72a32.1 32.1 0 0 1-32-32V48a16 16 0 0 1 16-16h16v-8a8 8 0 0 1 16 0v8h32v-8a8 8 0 0 1 16 0v8h32v-8a8 8 0 0 1 16 0v8h16a16 16 0 0 1 16 16Zm-16 0h-16v8a8 8 0 0 1-16 0v-8h-32v8a8 8 0 0 1-16 0v-8H88v8a8 8 0 0 1-16 0v-8H56v152a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16Z"
                  />
                </svg>
                <h2 className="text-8xl font-black leading-none z-10">
                  {capsule?.items
                    .filter((item) => item.type === "note")
                    .length.toString()
                    .padStart(2, "0")}
                </h2>
                <p className="text-3xl font-bold z-10 text-stone-700">
                  {capsule?.items.filter((item) => item.type === "note")
                    .length === 1
                    ? "Note"
                    : "Notes"}
                </p>
              </div>
            </div>
            <div className="flex gap-3 md:flex-row flex-col w-full">
              <div className="bg-orange-200/90 w-full aspect-square cursor-pointer hover:bg-orange-200/70">
                <UploadDialog
                  capsuleId={capsule?.id as string}
                  disabled={capsule.locked}
                />
              </div>
              <div className="bg-orange-200/90 w-full aspect-square cursor-pointer hover:bg-orange-200/70">
                <NoteDialog
                  capsuleId={capsule?.id as string}
                  disabled={capsule.locked}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 leading-none w-full h-full">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mr-2 w-6 h-6 text-stone-700"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M7 4V2.5M17 4V2.5M2.5 9h19"
                />
                <path
                  fill="currentColor"
                  d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                />
              </g>
            </svg>
            Capsule created ~ {capsule?.createdAt.toLocaleDateString("en-US")}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mr-2 w-6 h-6 text-stone-700"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 13.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75"
              />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M5.25 9.303V8a6.75 6.75 0 0 1 13.5 0v1.303c.227.016.44.036.642.064c.9.12 1.658.38 2.26.981c.602.602.86 1.36.982 2.26c.116.867.116 1.97.116 3.337v.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26c-.602.602-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-8.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982c-.602-.602-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981a9.55 9.55 0 0 1 .642-.064M6.75 8a5.25 5.25 0 0 1 10.5 0v1.253c-.373-.003-.772-.003-1.195-.003h-8.11c-.423 0-.821 0-1.195.003zm-1.942 2.853c-.734.099-1.122.28-1.399.556c-.277.277-.457.665-.556 1.4c-.101.755-.103 1.756-.103 3.191c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h8c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191c0-1.435-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.277-.277-.665-.457-1.4-.556c-.755-.101-1.756-.103-3.191-.103H8c-1.435 0-2.437.002-3.192.103"
                clip-rule="evenodd"
              />
            </svg>
            Capsule locked ~ {capsule?.locked ? "yes" : "no"}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mr-2 w-6 h-6 text-stone-700"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 13V9"
                />
                <path stroke-linecap="round" d="M10 2h4" />
              </g>
            </svg>
            Capsule opens ~{" "}
            {capsule?.openingDate
              ? capsule?.openingDate.toLocaleDateString("en-US")
              : "N/A"}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
