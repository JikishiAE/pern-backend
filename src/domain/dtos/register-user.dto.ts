import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  @IsNotEmpty()
  nombre!: string;

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

  @IsString()
  @IsNotEmpty()
  @IsIn(["Cliente", "Negocio"], {
    message: 'El valor debe ser "Cliente" o "Negocio"',
  })
  rol!: string;

  // private constructor(
  //   public nombre: string,
  //   public correo: string,
  //   public contrasena: string,
  //   public rol: string = 'Cliente',
  //   public es_verificado: boolean = false
  // ) {}

  // static create( object: { [key:string]:any } ): [string?, RegisterUserDto?] {
  //   const { nombre, correo, contrasena, rol } = object;

  //   if ( !nombre ) return ['Missing name'];
  //   if ( !correo ) return ['Missing email'];
  //   if ( !rol ) return ['Missing role'];
  //   if ( rol !== 'Cliente' && rol !== 'Negocio' ) return ['Invalid Role'];
  //   if ( !regularExps.email.test( correo ) ) return ['Email is not valid'];
  //   if ( !contrasena ) return ['Missing password'];
  //   if ( contrasena.length < 6 ) return ['Password too short'];

  //   return [undefined, new RegisterUserDto(nombre, correo, contrasena)];

  // }


}