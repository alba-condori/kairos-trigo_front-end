export async function obtenerProducto() {
  const response = await fetch("http://127.0.0.1:8080/api/productos?size=100");
  if (!response.ok) {
    throw new Error(`hubo un error ${response.status}`);
  }
  return response.json();
}


