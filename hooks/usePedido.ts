import { useState } from "react";
import { crearPedido } from "@/service/PedidoService";
import type { Pedido, PedidoRequest } from "@/types/api";

export function usePedido() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function crear(req: PedidoRequest): Promise<Pedido | null> {
    try {
      setLoading(true);
      setError(null);
      return await crearPedido(req);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { crear, loading, error };
}