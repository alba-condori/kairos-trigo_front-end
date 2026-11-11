import { useState } from "react";
import { crearCliente } from "@/service/ClienteService";
import type { Cliente, ClienteRequest } from "@/types/api";

export function useCliente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function crear(req: ClienteRequest): Promise<Cliente | null> {
    try {
      setLoading(true);
      setError(null);
      return await crearCliente(req);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { crear, loading, error };
}