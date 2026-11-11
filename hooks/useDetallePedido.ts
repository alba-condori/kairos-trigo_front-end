import { useState } from "react";
import { crearDetallePedido } from "@/service/DetallePedidoService";
import type { DetallePedido, DetallePedidoRequest } from "@/types/api";

export function useDetallePedido() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function crear(req: DetallePedidoRequest): Promise<DetallePedido | null> {
    try {
      setLoading(true);
      setError(null);
      return await crearDetallePedido(req);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { crear, loading, error };
}