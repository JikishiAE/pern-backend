export class UserEntity {

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string,
  ) { }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, nombre, correo, es_verificado, contrasena, rol } = object;
    return new UserEntity( id, nombre, correo, es_verificado, contrasena, rol );
  }


}