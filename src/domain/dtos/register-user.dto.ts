import { regularExps } from '../../config';

export class RegisterUserDto {

  private constructor(
    public nombre: string,
    public correo: string,
    public contrasena: string,
    public rol: string = 'Cliente',
    public es_verificado: boolean = false
  ) {}

  static create( object: { [key:string]:any } ): [string?, RegisterUserDto?] {
    const { nombre, correo, contrasena, rol } = object;

    if ( !nombre ) return ['Missing name'];
    if ( !correo ) return ['Missing email'];
    if ( !rol ) return ['Missing role'];
    if ( rol !== 'Cliente' && rol !== 'Negocio' ) return ['Invalid Role'];
    if ( !regularExps.email.test( correo ) ) return ['Email is not valid'];
    if ( !contrasena ) return ['Missing password'];
    if ( contrasena.length < 6 ) return ['Password too short'];

    return [undefined, new RegisterUserDto(nombre, correo, contrasena)];

  }


}