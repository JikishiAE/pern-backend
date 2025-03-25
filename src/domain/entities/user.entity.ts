import { CustomError } from '../errors/custom.error';


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

    if ( !id ) {
      throw CustomError.badRequest( 'Missing id' );
    }

    if ( !nombre ) throw CustomError.badRequest( 'Missing name' );
    if ( !correo ) throw CustomError.badRequest( 'Missing email' );
    if ( es_verificado === undefined ) throw CustomError.badRequest( 'Missing emailValidated' );
    if ( !contrasena ) throw CustomError.badRequest( 'Missing password' );
    if ( !rol ) throw CustomError.badRequest( 'Missing role' );


    return new UserEntity( id, nombre, correo, es_verificado, contrasena, rol );

  }


}