import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("https://egide.defensoria.mt.def.br/logout");
    signOut({ callbackUrl: "https://egide.defensoria.mt.def.br/logout" });
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:bg-white/10 rounded-md transition-colors p-1"
    >
      <IoIosLogOut size={32} />
    </button>
  );
}
