import { useState } from "react";
import type { CartLine } from "@/components/cart/cart-provider";
import type { CustomerDetails } from "@/lib/order-message";
import { siteConfig } from "@/lib/site-config";
import { crearCliente } from "@/service/ClienteService";
import { crearPedido } from "@/service/PedidoService";
import { crearDetallePedido } from "@/service/DetallePedidoService";
import { crearDetallePersonalizado } from "@/service/DetallePersonalizadoService";

export function useEnviarPedido() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(cliente: CustomerDetails, lines: CartLine[], total: number): Promise<boolean> {
    try {
      setEnviando(true);
      setError(null);

      // 1. el cliente
      const nuevoCliente = await crearCliente({
        nombre: cliente.name,
        apellido: cliente.lastName,
        telefono: cliente.phone,
      });

      // 2. el pedido (usa el id del cliente que acabamos de crear)
      const pedido = await crearPedido({
        clienteId: nuevoCliente.id,
        fechaRetiro: cliente.date,
        franjaHoraria: cliente.timeSlot,
        tipoEntrega: cliente.mode,
        direccion: cliente.address,
        estado: "Pendiente",
        total,
        sena: Math.round((total * siteConfig.depositPercent) / 100),
        senaPagada: false,
      });

      // 3. un detalle por cada línea del carrito (usan el id del pedido)
      for (const line of lines) {
        if (line.kind === "product") {
          await crearDetallePedido({
            pedidoId: pedido.id,
            productoId: Number(line.productId),
            cantidad: line.quantity,
            variedad: line.options.map((o) => o.value).join(", ").slice(0, 50) || undefined,
            precioUnitario: line.unitPrice,
          });
        } else {
          await crearDetallePersonalizado({
            pedidoId: pedido.id,
            tipo: line.type,
            nombrePersonalizado: line.type === "Otro" ? line.what.slice(0, 100) : "Torta personalizada",
            cantidad: line.quantity,
            porciones: line.type === "Torta" ? line.servings : undefined,
            sabor: line.type === "Torta" ? line.flavor.slice(0, 50) : undefined,
            descripcion: line.details,
            linkReferencia: line.type === "Torta" ? line.referenceLink?.slice(0, 300) : undefined,
            imagenPorWhatsapp: line.type === "Torta" ? line.referenceImage : undefined,
          });
        }
      }
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      return false;
    } finally {
      setEnviando(false);
    }
  }

  return { enviar, enviando, error };
}