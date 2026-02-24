import { FaWallet } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-content mx-44 mt-6 mb-6">
        <div className="bg-green-200 text-green-700 px-2 py-2 rounded-lg mr-3">
          <FaWallet className="text-3xl" />
        </div>
        <section>
          <h1 className="text-2xl font-bold">MeuBolso</h1>
          <p className="text-sm font-semibold">Controle Financeiro Pessoal</p>
        </section>
      </div>
    </header>
  );
}
