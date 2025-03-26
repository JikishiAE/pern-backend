import { Column, Model, PrimaryKey, Table, ForeignKey, AutoIncrement, AllowNull, IsNumeric, Min } from 'sequelize-typescript';
import Orden from './orden.model';
import Producto from './producto.model';

@Table(
  { 
    tableName: 'ordenes_productos',
    timestamps: true,
    paranoid: true,
  }
)
export default class OrdenProducto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Orden)
  @Column
  orden_id!: number;

  @ForeignKey(() => Producto)
  @Column
  producto_id!: number;

  @AllowNull(false)
  @IsNumeric
  @Min(1)
  @Column
  cantidad!: number;
}
