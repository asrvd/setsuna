"use client";

import { signIn, signOut } from "next-auth/react";

export default function SignIn({ label }: { label?: string }) {
  return (
    <button
      className="px-3 py-2 text-lg bg-orange-900 text-stone-50 max-w-max"
      onClick={() => {
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      }}
    >
      {label || "Sign in"}
    </button>
  );
}

export function SignOut({ label }: { label?: string }) {
  return (
    <button
      className="px-3 py-2 text-lg bg-orange-900 text-stone-50 max-w-max"
      onClick={() => signOut()}
    >
      {label || "Sign out"}
    </button>
  );
}
