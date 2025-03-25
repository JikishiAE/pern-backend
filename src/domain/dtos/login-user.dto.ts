import { regularExps } from '../../config';

export class LoginUserDto {

  private constructor(
    public correo: string,
    public contrasena: string,
  ) {}

  static create( object: { [key:string]:any } ): [string?, LoginUserDto?] {
    const { correo, contrasena } = object;

    if ( !correo ) return ['Missing email'];
    if ( !regularExps.email.test( correo ) ) return ['Email is not valid'];
    if ( !contrasena ) return ['Missing password'];
    if ( contrasena.length < 6 ) return ['Password too short'];

    return [undefined, new LoginUserDto(correo, contrasena)];

  }


}