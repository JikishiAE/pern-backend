import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, HasMany, AutoIncrement, Default, AllowNull, IsNumeric, Min } from 'sequelize-typescript';
import Usuario from './usuario.model';
import Negocio from './negocio.model';
import OrdenProducto from './orden_producto.model';

@Table({ tableName: 'ordenes' })
export default class Orden extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Usuario)
  @Column
  usuario_id!: number;

  @ForeignKey(() => Negocio)
  @Column
  negocio_id!: number;

  @Default('Por pagar')
  @Column
  estatus!: 'Por pagar' | 'Pagada' | 'Devuelta' | 'Cancelada';

  @AllowNull(false)
  @IsNumeric
  @Min(0)
  @Column
  subtotal!: number;

  @AllowNull(false)
  @IsNumeric
  @Min(0)
  @Column
  iva!: number;

  @AllowNull(false)
  @IsNumeric
  @Min(0)
  @Column
  total!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @BelongsTo(() => Negocio)
  negocio!: Negocio;

  @HasMany(() => OrdenProducto)
  productos!: OrdenProducto[];
}
