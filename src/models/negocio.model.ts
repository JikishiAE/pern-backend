import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, AutoIncrement, AllowNull, Unique } from 'sequelize-typescript';
import Usuario from './usuario.model';

@Table(
  { 
    tableName: 'negocios',
    timestamps: true,
    paranoid: true,
  }
)
export default class Negocio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Unique(true)
  @Column({ unique: true })
  nombre!: string;

  @ForeignKey(() => Usuario)
  @Column
  propietario_id!: number;

  @BelongsTo(() => Usuario)
  propietario!: Usuario;
}
