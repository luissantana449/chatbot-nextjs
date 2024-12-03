import Link from "next/link";
import { SERVICOS_IA } from "./constants";

export default function HomePage() {
  return (
    <main className="container mx-auto flex flex-col  items-center ">
      {/* <div className="text-2xl font-bold">Bem-vindo(a)</div> */}
      <div className="flex justify-center gap-10 w-full my-20">
        {SERVICOS_IA.map((servico) => {
          return (
            <Link
              href={servico.route}
              key={servico.route}
              className="flex items-center justify-center w-56 h-44 border rounded-xl shadow-md cursor-pointer hover:scale-110 hover:border-green-500 hover:bg-green-50 hover:shadow-xl ease-in-out transition-all font-bold"
            >
              <p className="text-center uppercase">{servico.label}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
