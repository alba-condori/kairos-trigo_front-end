import { useState } from "react";
import { crearDetallePersonalizado } from "@/service/DetallePersonalizadoService";
import type { DetallePersonalizado, DetallePersonalizadoRequest } from "@/types/api";

export function useDetallePersonalizado() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function crear(req: DetallePersonalizadoRequest): Promise<DetallePersonalizado | null> {
    try {
      setLoading(true);
      setError(null);
      return await crearDetallePersonalizado(req);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { crear, loading, error };
}