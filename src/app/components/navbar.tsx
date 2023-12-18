import UserMenu from "./user-menu";
import { auth } from "../auth";
import SignIn from "./auth";

export async function SideStuff() {
  const session = await auth();

  if (session?.user) return <UserMenu session={session} />;

  return <SignIn label="Get Started" />;
}

export default function Navbar({ page }: { page: string }) {
  return (
    <div className="p-4 border-b border-stone-900 w-full flex justify-between items-center">
      <p className="text-3xl text-orange-900 font-bold">Setsuna</p>
      <SideStuff />
    </div>
  );
}
