/* eslint-disable @next/next/no-img-element */

import Navbar from "../components/navbar";
import CapsuleDialog from "../components/capsule-dialog";
import { db } from "../lib/db";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer";

async function Capsules() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const capsules = await db.timeCapsule.findMany({
    where: { userId: session.user.id },
  });

  return (
    <section className="p-4 pt-0 min-w-full h-full">
      {capsules.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full gap-3 min-h-screen">
          <img
            src="https://illustrations.popsy.co/amber/surreal-hourglass.svg"
            className="h-[400px] w-[400px]"
            alt="empty-state"
          />
          <h2 className="text-3xl font-bold text-center">
            You haven&apos;t created any time capsules yet.{" "}
          </h2>
          <CapsuleDialog />
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full h-full min-h-screen">
          <div className="flex w-full flex-col lg:flex-row gap-3 justify-between lg:items-center">
            <h2 className="lg:text-3xl text-xl font-bold">Your capsules</h2>
            <CapsuleDialog />
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 w-full gap-3">
            {capsules.map((capsule) => (
              <Link href={`/capsule/${capsule.id}`} key={capsule.id}>
                <div
                  key={capsule.id}
                  className="flex flex-col gap-3 justify-between aspect-square bg-orange-200/90 p-2 w-full h-full"
                >
                  <div className="flex flex-col gap-1 max-h-[90%] overflow-hidden">
                    <h3 className="text-xl font-bold">{capsule.name}</h3>
                    <p className="text-stone-900">{capsule.description}</p>
                  </div>
                  <span className="text-sm text-stone-700">
                    {capsule.locked ? "Locked" : "Not locked"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function Dashboard() {
  return (
    <main className="bg-orange-100 font-sans flex flex-col items-center min-h-screen min-w-screen gap-4 overflow-x-hidden relative">
      <Navbar page="Dashboard" />
      <Capsules />
      <Footer />
    </main>
  );
}
