import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  contrasena!: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  correo!: string;

  // private constructor(
  //   public correo: string,
  //   public contrasena: string,
  // ) {}

  // static create( object: { [key:string]:any } ): [string?, LoginUserDto?] {
  //   const { correo, contrasena } = object;

  //   if ( !correo ) return ['Missing email'];
  //   if ( !regularExps.email.test( correo ) ) return ['Email is not valid'];
  //   if ( !contrasena ) return ['Missing password'];
  //   if ( contrasena.length < 6 ) return ['Password too short'];

  //   return [undefined, new LoginUserDto(correo, contrasena)];

  // }


}