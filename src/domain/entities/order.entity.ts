import { IProduct } from "../interfaces";

export class OrderEntity {

  constructor(
    public id: number,
    public id_user: number,
    public id_business: number,
    public id_status: number,
    public subtotal: number,
    public iva: number,
    public total: number,
    public products: IProduct[]
  ) { }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, usuario_id, negocio_id, estatus_id, subtotal, iva, total, productos } = object;
    return new OrderEntity( id, usuario_id, negocio_id, estatus_id, subtotal, iva, total, productos );
  }


}