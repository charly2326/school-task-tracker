import { useState } from "react";
import AgregarMeta from "./AgregarMeta";

interface Meta {
  nombre: string;
  metaTotal: number;
  ahorrado: number;
  emoji: string;
}

export default function MetasAhorro() {
  const [metas, setMetas] = useState<Meta[]>([
    { nombre: "Bicicleta", metaTotal: 80000, ahorrado: 25000, emoji: "🚲" },
    { nombre: "Juguete", metaTotal: 25000, ahorrado: 12000, emoji: "🧸" },
  ]);

  const agregarMeta = (meta: Meta) => {
    setMetas([...metas, meta]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-purple-800">🎯 Metas de Ahorro</h2>

      {metas.map((meta, index) => {
        const porcentaje = Math.min((meta.ahorrado / meta.metaTotal) * 100, 100);

        return (
          <div key={index} className="bg-white rounded-xl shadow p-4 border border-purple-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{meta.emoji} {meta.nombre}</span>
              <span className="text-sm text-gray-500">
                ${meta.ahorrado.toLocaleString()} / ${meta.metaTotal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-purple-100 h-3 rounded mt-2 overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${porcentaje}%` }}
              ></div>
            </div>
          </div>
        );
      })}

      <AgregarMeta onAgregar={agregarMeta} />
    </div>
  );
}

