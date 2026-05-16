"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";

const links = [
  { href: "/", label: "Home" },
  { href: "/sistema/paginas/curriculos", label: "Currículos" },
  { href: "/sistema/paginas/curriculos/novo", label: "Cadastrar" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-slate-300 transition">
          <FiFileText size={24} />
          GestãoCurrículos
        </Link>

        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-slate-300 ${
                pathname === link.href
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-slate-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}