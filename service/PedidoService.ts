import type { Cliente, ClienteRequest, Page, Pedido, PedidoRequest } from "@/types/api";

const URL = "http://127.0.0.1:8080/api/pedidos";

export async function obtenerPedidos(): Promise<Page<Pedido>> {
  const response = await fetch(`${URL}?size=100`);
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}

export async function crearPedido(req:     PedidoRequest): Promise<Pedido> {
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