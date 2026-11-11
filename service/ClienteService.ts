import type { Cliente, ClienteRequest, Page } from "@/types/api";

const URL = "http://127.0.0.1:8080/api/clientes";

export async function obtenerClientes(): Promise<Page<Cliente>> {
  const response = await fetch(`${URL}?size=100`);
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}

export async function crearCliente(req: ClienteRequest): Promise<Cliente> {
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