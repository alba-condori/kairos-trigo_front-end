import type { DetallePedido, DetallePedidoRequest, Page } from "@/types/api";

const URL = "http://127.0.0.1:8080/api/detalles-pedido";

export async function obtenerDetallesPedido(): Promise<Page<DetallePedido>> {
  const response = await fetch(`${URL}?size=100`);
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}

export async function crearDetallePedido(req:     DetallePedidoRequest): Promise<DetallePedido> {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}