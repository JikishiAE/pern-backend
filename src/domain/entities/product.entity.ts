export class ProductEntity {

  constructor(
    public id: number,
    public id_business: number,
    public name: string,
    public quantity: number,
    public price: number,
    public in_existence: boolean,
  ) { }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, negocio_id, nombre, cantidad, precio, en_existencia } = object;
    return new ProductEntity( id, negocio_id, nombre, cantidad, precio, en_existencia );
  }


}