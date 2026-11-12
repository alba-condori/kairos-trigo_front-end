import type { Cliente, ClienteRequest, DetallePedido, DetallePedidoRequest, DetallePersonalizado, DetallePersonalizadoRequest, Page, Pedido, PedidoRequest } from "@/types/api";

const URL = "http://127.0.0.1:8080/api/detalles-personalizados";

export async function obtenerDetallesPersonalizado(): Promise<Page<DetallePersonalizado>> {
  const response = await fetch(`${URL}?size=100`);
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}

export async function crearDetallePersonalizado(req:     DetallePersonalizadoRequest): Promise<DetallePersonalizado> {
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