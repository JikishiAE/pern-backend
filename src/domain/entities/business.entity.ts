export class BusinessEntity {

  constructor(
    public id: number,
    public name: string,
    public id_owner: number,
  ) { }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, nombre, propietario_id } = object;
    return new BusinessEntity( id, nombre, propietario_id );
  }


}