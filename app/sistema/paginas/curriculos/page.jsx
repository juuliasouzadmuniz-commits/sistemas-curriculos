"use client";

import { useState } from "react";
import { curriculos } from "@/data/curriculos";
import Link from "next/link";
import { FiSearch, FiUser } from "react-icons/fi";

export default function ListaCurriculos() {
  const [busca, setBusca] = useState("");

  const filtrados = curriculos.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Currículos</h1>
      <p className="text-slate-500 mb-6">Encontre candidatos cadastrados no sistema.</p>

      <div className="relative mb-8">
        <FiSearch className="absolute left-3 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou cargo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-slate-400 text-center py-16">Nenhum currículo encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((curriculo) => (
            <Link
              key={curriculo.id}
              href={`/sistema/paginas/curriculos/${curriculo.id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-100 rounded-full p-3">
                  <FiUser size={24} className="text-slate-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">{curriculo.nome}</h2>
                  <p className="text-sm text-slate-500">{curriculo.cargo}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3">{curriculo.resumo}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}