import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import SettingsForm from "../components/settings-form";

async function getUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return session.user;
}

export default async function Settings() {
  const user = await getUser();

  return (
    <main className="bg-orange-100 font-sans flex flex-col items-center min-h-screen min-w-screen gap-4 overflow-x-hidden relative">
      <Navbar page="Setsuna" />
      <section className="lg:w-2/3 md:w-4/5 pt-8 lg:pt-12 p-4 lg:p-0 flex flex-col gap-6 w-full min-h-screen">
        <h2 className="lg:text-3xl text-xl font-bold">Settings</h2>
        <SettingsForm
          name={user?.name as string}
          email={user?.email as string}
        />
      </section>
      <Footer />
    </main>
  );
}
