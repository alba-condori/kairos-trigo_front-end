export type Page<T> = { content: T[]; totalElements: number; totalPages: number };

export type Producto = {
  id: number;
  nombre: string | null;
  descripcion: string | null;
  categoria: string | null;
  precio: number | null;
  unidad: string | null;
};
export type Cliente = { 
    id: number; 
    nombre: string | null; 
    apellido: string | null; 
    telefono: string | null };
export type ClienteRequest = { 
    nombre: string; 
    apellido?: string; 
    telefono?: string };

export type Pedido = {
  id: number; 
  clienteId: number | null; 
  fechaPedido: string | null; 
  fechaRetiro: string | null;
  franjaHoraria: string | null; 
  tipoEntrega: string | null; 
  direccion: string | null;
  estado: string | null; 
  total: number | null; 
  sena: number | null; 
  senaPagada: boolean | null;
};
export type PedidoRequest = {
  clienteId: number; 
  fechaRetiro?: string; 
  franjaHoraria?: string; 
  tipoEntrega?: string;
  direccion?: string; 
  estado?: string; 
  total?: number; 
  sena?: number; 
  senaPagada?: boolean;
};

export type DetallePedido = {
  id: number; 
  pedidoId: number | null; 
  productoId: number | null;
  cantidad: number | null; 
  variedad: string | null; 
  precioUnitario: number | null;
};
export type DetallePedidoRequest = {
  pedidoId: number; 
  productoId: number; 
  cantidad: number; 
  variedad?: string; 
  precioUnitario?: number;
};

export type DetallePersonalizado = {
  id: number; 
  pedidoId: number | null; 
  tipo: string | null; 
  nombrePersonalizado: string | null;
  cantidad: number | null; 
  porciones: number | null; 
  sabor: string | null; 
  descripcion: string | null;
  linkReferencia: string | null; 
  imagenPorWhatsapp: boolean | null; 
  precioCotizado: number | null;
};
export type DetallePersonalizadoRequest = {
  pedidoId: number; 
  tipo?: string; 
  nombrePersonalizado?: string; 
  cantidad?: number; 
  porciones?: number;
  sabor?: string; 
  descripcion?: string; 
  linkReferencia?: string; 
  imagenPorWhatsapp?: boolean; 
  precioCotizado?: number;
};