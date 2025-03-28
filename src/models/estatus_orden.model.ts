import { Column, Model, PrimaryKey, Table, HasMany, AutoIncrement, AllowNull, Unique } from 'sequelize-typescript';
import Orden from './orden.model';

@Table({
  tableName: 'estatus_orden',
  timestamps: false,
})
export default class EstatusOrden extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Unique
  @Column
  nombre!: string;

  @HasMany(() => Orden)
  ordenes!: Orden[];
}
