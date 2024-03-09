"use client";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const { status } = useSession();
  const onLogin = async () => {
    await signIn("discord", { callbackUrl: "/home/playground" });
  };

  if (status === "authenticated") redirect("/home/playground");

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#F4EDE3]">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-2 rounded-xl p-20 shadow-2xl">
        <Image
          src="/assets/logo.png"
          alt="Union logo"
          className=""
          width={200}
          height={0}
          priority
        />
        <Image
          src="/assets/union_copy.png"
          alt="Union Copy"
          className=""
          width={150}
          height={24}
          priority
        />
        <h1 className="text-xl font-bold opacity-50">
          Make Collaboration Easier
        </h1>
        <button
          className="rounded-lg bg-[#00DF8E] px-4 py-2 transition delay-150 duration-300 ease-in-out hover:scale-110"
          onClick={onLogin}
        >
          Discord Login
        </button>
      </div>

      <div className="absolute bottom-0 w-full px-20 pb-4">
        <p>&copy; 2024 Elephant Union. All rights reserved.</p>
      </div>
    </main>
  );
}
