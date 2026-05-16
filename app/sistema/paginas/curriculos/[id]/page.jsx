"use client";

import { curriculos } from "@/data/curriculos";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiFileText } from "react-icons/fi";

export default function DetalhesCurriculo() {
  const { id } = useParams();
  const router = useRouter();
  const curriculo = curriculos.find((c) => c.id === id);

  if (!curriculo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Currículo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition"
      >
        <FiArrowLeft /> Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-slate-100 rounded-full p-4">
            <FiUser size={32} className="text-slate-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{curriculo.nome}</h1>
            <p className="text-slate-500">{curriculo.cargo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-slate-600">
            <FiMail className="text-slate-400" />
            <span className="text-sm">{curriculo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <FiPhone className="text-slate-400" />
            <span className="text-sm">{curriculo.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <FiFileText className="text-slate-400" />
            <span className="text-sm">{curriculo.cpf}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-slate-700 mb-2">Resumo Profissional</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{curriculo.resumo}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-slate-700 mb-3">Experiências Profissionais</h2>
          {curriculo.experiencias.map((exp, i) => (
            <div key={i} className="border-l-2 border-slate-200 pl-4 mb-4">
              <p className="font-medium text-slate-800">{exp.cargo}</p>
              <p className="text-sm text-slate-500">{exp.empresa} · {exp.inicio} – {exp.fim}</p>
              <p className="text-sm text-slate-600 mt-1">{exp.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-slate-700 mb-3">Formação Acadêmica</h2>
          {curriculo.formacoes.map((form, i) => (
            <div key={i} className="border-l-2 border-slate-200 pl-4 mb-4">
              <p className="font-medium text-slate-800">{form.curso}</p>
              <p className="text-sm text-slate-500">{form.instituicao} · {form.inicio} – {form.fim}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-semibold text-slate-700 mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {curriculo.habilidades.map((hab, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full">
                {hab}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}