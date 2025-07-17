interface SaldoDisponibleProps {
  saldo: number;
}

export default function SaldoDisponible({ saldo }: SaldoDisponibleProps) {
  return (
    <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center shadow-md">
      <h2 className="text-2xl font-bold text-green-800">💰 Tu Saldo Actual</h2>
      <p className="text-3xl mt-2 font-extrabold text-green-700">${saldo.toLocaleString()}</p>
      <p className="text-sm text-green-600 mt-1">¡Sigue ahorrando para alcanzar tus metas! 🏆</p>
    </div>
  );
}

