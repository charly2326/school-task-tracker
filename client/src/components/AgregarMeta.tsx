import { useState } from "react";

interface Meta {
  nombre: string;
  metaTotal: number;
  ahorrado: number;
  emoji: string;
}

interface Props {
  onAgregar: (meta: Meta) => void;
}

export default function AgregarMeta({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [metaTotal, setMetaTotal] = useState("");
  const [emoji, setEmoji] = useState("");

  const agregar = () => {
    if (!nombre || !metaTotal || !emoji) return;
    onAgregar({ nombre, metaTotal: Number(metaTotal), ahorrado: 0, emoji });
    setNombre("");
    setMetaTotal("");
    setEmoji("");
  };

  return (
    <div className="bg-white border border-purple-300 rounded-xl p-4 shadow-md space-y-2">
      <h3 className="font-bold text-purple-700">➕ Agrega una nueva meta</h3>

      <input
        className="w-full p-2 border rounded text-black"
        placeholder="Nombre (ej: Bicicleta)"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded text-black"
        type="number"
        placeholder="Monto total (ej: 50000)"
        value={metaTotal}
        onChange={(e) => setMetaTotal(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded text-black"
        placeholder="Emoji (ej: 🚲)"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />

      <button
        onClick={agregar}
        className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600"
      >
        Agregar Meta
      </button>
    </div>
  );
}



