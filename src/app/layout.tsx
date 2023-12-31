import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Setsuna",
  description: "Create virtual time capsules that take you back in time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "bg-orange-200/90 w-full p-3 text-base font-sans flex items-center gap-3 text-stone-900",
            },
          }}
          position="top-center"
        />
        {children}
      </body>
    </html>
  );
}
