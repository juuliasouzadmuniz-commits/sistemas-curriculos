export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© 2026 GestãoCurrículos. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">Sobre</a>
          <a href="#" className="hover:text-white transition">Contato</a>
          <a href="#" className="hover:text-white transition">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}