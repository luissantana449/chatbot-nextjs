"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleEgideSignin = () => {
    signIn("oauth-egide");
  };

  return (
    <div className="p-4 md:p-8 rounded-sm w-full h-[95%] overflow-hidden flex justify-center items-center text-primary ">
      <div className="flex items-center flex-col text-sm gap-4">
        <div>
          <h1 className="text-center text-xl font-bold">
            Bem-vindo(a) ao Portal do Defensor
          </h1>
          <p className="text-zinc-400 text-center">
            Clique no botão abaixo para realizar login e acessar o chat da
            Defensoria
          </p>
        </div>
        <button
          className="px-10 py-2 bg-primary text-white rounded-sm"
          onClick={handleEgideSignin}
        >
          Acessar
        </button>
      </div>
    </div>
  );
}
