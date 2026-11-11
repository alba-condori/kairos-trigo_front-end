import { useState, useEffect } from "react";
import { obtenerProducto } from "@/service/ProductoService";
import type { Producto } from "@/types/api";

export function useProducto() {
  const [prods, setProds] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function traerProds() {
      try {
        const data = await obtenerProducto();
        setProds(data.content);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    traerProds();
  }, []);

  return { prods, loading, error };
}