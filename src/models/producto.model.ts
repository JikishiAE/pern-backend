import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, Default, AutoIncrement, AllowNull, IsNumeric, Min, DataType, HasMany } from 'sequelize-typescript';
import Negocio from './negocio.model';
import OrdenProducto from './orden_producto.model';

@Table(
  { 
    tableName: 'productos',
    timestamps: true,
    paranoid: true,
  }
)
export default class Producto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Negocio)
  @Column
  negocio_id!: number;

  @AllowNull(false)
  @Column
  nombre!: string;

  @Default(0)
  @IsNumeric
  @Min(0)
  @Column
  cantidad!: number;

  @AllowNull(false)
  @IsNumeric
  @Min(0)
  @Column({
    type: DataType.FLOAT,
  })
  precio!: number;

  @Default(true)
  @Column
  en_existencia!: boolean;

  @BelongsTo(() => Negocio)
  negocio!: Negocio;

  @HasMany(() => OrdenProducto)
  ordenesProductos!: OrdenProducto[];
}
