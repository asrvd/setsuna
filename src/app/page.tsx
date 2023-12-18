/* eslint-disable @next/next/no-img-element */
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="bg-orange-100 font-sans flex flex-col items-center min-h-screen min-w-screen gap-10 overflow-x-hidden relative">
      <Navbar page="Setsuna" />
      <div className="flex flex-col lg:w-2/3 w-full p-4">
        <h2 className="font-serif text-center text-7xl font-black text-stone-900 lg:max-w-4xl">
          Your life&apos;s{" "}
          <span className="text-orange-900">time-travelling</span> odyssey starts
          here.
        </h2>
        <p className="text-xl font-light mt-3 text-center">
          Create your own virtual time capsules that take you back to the
          moments that matter.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-10 overflow-hidden py-4">
        <img
          src="https://images.unsplash.com/photo-1635439127087-0fe6a481bde5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="-rotate-[4deg]"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1701959827370-1ced5e4f7721?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rotate-[4deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1702329554065-efd758889d77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="-rotate-[4deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rotate-[4deg]"
        />
        {/* <img
          src="https://images.unsplash.com/photo-1701220291849-735ab3532959?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rotate-3"
        /> */}
        <img
          src="https://images.unsplash.com/photo-1657070174397-569b53c68e29?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="-rotate-[4deg]"
        />
      </div>
      <Footer />
    </main>
  );
}
