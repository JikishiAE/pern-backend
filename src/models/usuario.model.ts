import { Column, Model, PrimaryKey, Table, HasMany, AutoIncrement, AllowNull, Unique, Default } from 'sequelize-typescript';
import Negocio from './negocio.model';
import Orden from './orden.model';

@Table({ tableName: 'usuarios' })
export default class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  nombre!: string;

  @AllowNull(false)
  @Unique(true)
  @Column({ unique: true })
  correo!: string;

  @AllowNull(false)
  @Column
  contrasena!: string;

  @AllowNull(false)
  @Column
  rol!: 'Negocio' | 'Cliente';

  @Default(false)
  @Column
  es_verificado!: boolean;

  @HasMany(() => Negocio)
  negocios!: Negocio[];

  @HasMany(() => Orden)
  ordenes!: Orden[];
}
