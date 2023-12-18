"use client";

import { useState, useEffect } from "react";
import { StopwatchIcon } from "./icons/stopwatch";
import { toast } from "sonner";
import { unlockCapsule } from "../lib/actions";
import { SpinnerIcon } from "./icons/spinner";
import confetti from "canvas-confetti";

export default function CapsuleCountdown({
  openingDate,
  capsuleId,
}: {
  openingDate: Date;
  capsuleId: string;
}) {
  // years, months, days, hours, minutes, seconds
  const [timeLeft, setTimeLeft] = useState([0, 0, 0, 0, 0, 0]);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (openingDate.getTime() <= Date.now()) return;
    const getTimeLeft = (openingDate: Date) => {
      const currentDateObj = new Date();
      const timeLeft = openingDate.getTime() - currentDateObj.getTime();
      const seconds = Math.floor((timeLeft / 1000) % 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30));
      const years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30 * 12));
      return [years, months, days, hours, minutes, seconds];
    };
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(openingDate);
      setTimeLeft(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [openingDate]);

  const paddedTimeLeft = timeLeft.map((time) =>
    time.toString().padStart(2, "0")
  );

  if (openingDate.getTime() <= Date.now()) {
    return (
      <button
        className="px-3 py-2 text-base bg-orange-900 text-stone-50 max-w-max self-end"
        onClick={async () => {
          setUnlocking(true);
          await unlockCapsule(capsuleId);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          toast.success("Capsule unlocked!");
          setUnlocking(false);
        }}
      >
        {unlocking ? (
          <SpinnerIcon className="w-5 h-5 mr-1 inline-block" />
        ) : null}
        {unlocking ? "Unlocking..." : "Unlock capsule"}
      </button>
    );
  }

  return (
    <p
      className="px-3 py-2 text-base bg-orange-900 self-end text-stone-50 max-w-max flex gap-2 items-center justify-center"
      aria-label="Time left until capsule opens"
      title="yr : mo : d : hr : min : sec"
    >
      <StopwatchIcon className="w-5 h-5 mr-1" />
      {paddedTimeLeft.join(" : ")}
    </p>
  );
}
