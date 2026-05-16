"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const schema = yup.object({
  nome: yup.string().min(3, "Nome muito curto").required("Nome é obrigatório"),
  cargo: yup.string().min(2, "Cargo muito curto").required("Cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().min(10, "Telefone inválido").required("Telefone é obrigatório"),
  cpf: yup.string().min(11, "CPF inválido").required("CPF é obrigatório"),
  resumo: yup.string().min(20, "Resumo muito curto (mín. 20 caracteres)").required("Resumo é obrigatório"),
});

export default function NovoCurriculo() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", inicio: "", fim: "" }],
    },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: formFields, append: appendForm, remove: removeForm } = useFieldArray({ control, name: "formacoes" });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Currículo cadastrado com sucesso!", {
      description: `${data.nome} foi adicionado ao sistema.`,
    });
  };

  const inputClass = "w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Novo Currículo</h1>
      <p className="text-slate-500 mb-8">Preencha os dados do candidato.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Dados Pessoais */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-4">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome</label>
              <input {...register("nome")} className={inputClass} placeholder="Nome completo" />
              {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Cargo Desejado</label>
              <input {...register("cargo")} className={inputClass} placeholder="Ex: Desenvolvedor Front-end" />
              {errors.cargo && <p className={errorClass}>{errors.cargo.message}</p>}
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input {...register("email")} className={inputClass} placeholder="email@exemplo.com" />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Telefone</label>
              <input {...register("telefone")} className={inputClass} placeholder="(47) 99999-9999" />
              {errors.telefone && <p className={errorClass}>{errors.telefone.message}</p>}
            </div>
            <div>
              <label className={labelClass}>CPF</label>
              <input {...register("cpf")} className={inputClass} placeholder="000.000.000-00" />
              {errors.cpf && <p className={errorClass}>{errors.cpf.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Foto (upload fake)</label>
              <input type="file" accept="image/*" className={inputClass} />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Resumo Profissional</label>
            <textarea {...register("resumo")} rows={3} className={inputClass} placeholder="Descreva seu perfil profissional..." />
            {errors.resumo && <p className={errorClass}>{errors.resumo.message}</p>}
          </div>
        </div>

        {/* Experiências */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-700">Experiências Profissionais</h2>
            <button type="button" onClick={() => appendExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 transition">
              <FiPlus size={14} /> Adicionar
            </button>
          </div>
          {expFields.map((field, i) => (
            <div key={field.id} className="border border-slate-100 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-600">Experiência {i + 1}</span>
                {expFields.length > 1 && (
                  <button type="button" onClick={() => removeExp(i)} className="text-red-400 hover:text-red-600 transition">
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input {...register(`experiencias.${i}.empresa`)} className={inputClass} placeholder="Empresa" />
                <input {...register(`experiencias.${i}.cargo`)} className={inputClass} placeholder="Cargo" />
                <input {...register(`experiencias.${i}.inicio`)} className={inputClass} placeholder="Início (mm/aaaa)" />
                <input {...register(`experiencias.${i}.fim`)} className={inputClass} placeholder="Fim (mm/aaaa ou atual)" />
                <div className="md:col-span-2">
                  <textarea {...register(`experiencias.${i}.descricao`)} rows={2} className={inputClass} placeholder="Descrição das atividades" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formações */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-700">Formação Acadêmica</h2>
            <button type="button" onClick={() => appendForm({ instituicao: "", curso: "", inicio: "", fim: "" })}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 transition">
              <FiPlus size={14} /> Adicionar
            </button>
          </div>
          {formFields.map((field, i) => (
            <div key={field.id} className="border border-slate-100 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-600">Formação {i + 1}</span>
                {formFields.length > 1 && (
                  <button type="button" onClick={() => removeForm(i)} className="text-red-400 hover:text-red-600 transition">
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input {...register(`formacoes.${i}.instituicao`)} className={inputClass} placeholder="Instituição" />
                <input {...register(`formacoes.${i}.curso`)} className={inputClass} placeholder="Curso" />
                <input {...register(`formacoes.${i}.inicio`)} className={inputClass} placeholder="Início (mm/aaaa)" />
                <input {...register(`formacoes.${i}.fim`)} className={inputClass} placeholder="Fim (mm/aaaa)" />
              </div>
            </div>
          ))}
        </div>
        {/* Habilidades */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-2">Habilidades</h2>
          <p className="text-xs text-slate-400 mb-3">Separe as habilidades por vírgula. Ex: React, Node.js, Figma</p>
          <input
            {...register("habilidades")}
            className={inputClass}
            placeholder="React, Next.js, Tailwind CSS..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Salvando..." : "Cadastrar Currículo"}
        </button>
      </form>
    </div>
  );
}