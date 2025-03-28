import { Op } from "sequelize";
import { AddProductOrderDto, CreateOrderDto, CustomError, GetOrdersDto, IFilterIds, OrderEntity, RemoveProductOrderDto } from "../../../domain";
import Orden from "../../../models/orden.model";
import Producto from "../../../models/producto.model";
import OrdenProducto from "../../../models/orden_producto.model";
import sequelize from "../../../db-connection";

export class OrdersRepository {

    public async findById(id: number): Promise<OrderEntity | null> {
        try {
            const order = await Orden.findOne({
                where: { id }
            });

            return order ? OrderEntity.fromObject(order) : null;
        }
        catch (error) {
            throw error;
        }
    }

    public async get(filters: GetOrdersDto, ids: IFilterIds): Promise<OrderEntity[]> {
        try {
        
            if (ids.id_user && ids.id_business) {
                throw CustomError.forbidden("Ha ocurrido algún error");
            }

            const whereConditions = Object.entries(filters)
                .filter(([_, value]) => value !== undefined && value !== null && value !== '')
                .map(([key, value]) => {
                    
                    if (typeof value === 'string') {
                        return { [key]: { [Op.like]: `%${value}%` } };
                    } else {
                        return { [key]: value };
                    }
                });

            const andConditions: any[] = [];
            if (ids.id_user) {
                andConditions.push({ usuario_id: ids.id_user });
            }
            if (ids.id_business) {
                andConditions.push({ negocio_id: ids.id_business });
            }

            const whereClause = {
                ...(andConditions.length > 0 ? { [Op.and]: andConditions } : {}),
                ...(whereConditions.length > 0 ? { [Op.or]: whereConditions } : {}),
            };

            const orders = await Orden.findAll({
                attributes: ['id', 'negocio_id', 'estatus_id', 'subtotal', 'iva', 'total'],
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                include: [
                    {
                        model: OrdenProducto,
                        as: 'productos',
                        attributes: ['producto_id', 'cantidad'],
                        include: [
                            {
                                model: Producto,
                                as: 'producto',
                                attributes: ['id', 'nombre']
                            }
                        ]
                    }
                ]
            });

            const usersArray = orders.map((order) => {
                try {
                    return OrderEntity.fromObject(order);
                } catch (error) {
                    throw error;
                }
            });
            
            return usersArray;
        }
        catch (error) {
            throw error;
        }
    }
    public async create(dto: CreateOrderDto, userId: number): Promise<OrderEntity> {
        try {
            return await sequelize.transaction(async (t) => {
                
                let subtotal = 0;
                for (const product of dto.productos) {
                    const producto = await Producto.findByPk(product.id);
                    if (!producto) {
                        throw new Error(`Producto con ID ${product.id} no encontrado`);
                    }
                    subtotal += producto.precio * product.cantidad;
                }
                const iva = subtotal * 0.16;
                const total = subtotal + iva;
    
                const nuevaOrden = await Orden.create(
                    {
                        usuario_id: userId,
                        negocio_id: dto.negocio_id,
                        estatus_id: 1,
                        subtotal,
                        iva,
                        total,
                    },
                    { transaction: t }
                );
    
                const ordenProductos = dto.productos.map((p) => ({
                    orden_id: nuevaOrden.id,
                    producto_id: p.id,
                    cantidad: p.cantidad,
                }));
                await OrdenProducto.bulkCreate(ordenProductos, { transaction: t });
    
                return OrderEntity.fromObject(nuevaOrden);
            });
        } catch (error) {
            throw error;
        }
    }
    public async addProduct(dto: AddProductOrderDto): Promise<OrderEntity> {
        try {
            return await sequelize.transaction(async (t) => {
                const order = await Orden.findByPk(dto.id, {
                    include: [{ model: OrdenProducto, as: "productos" }],
                    transaction: t,
                });
    
                if (!order) {
                    throw CustomError.notFound("Orden no encontrada");
                }

                const product = await Producto.findByPk(dto.producto.id, { transaction: t });
                if (!product) {
                    throw CustomError.notFound(`Producto con ID ${dto.producto.id} no encontrado`);
                }

                if (product.negocio_id !== order.negocio_id) {
                    throw CustomError.badRequest(
                        `El producto con ID ${dto.producto.id} no pertenece al negocio de la orden`
                    );
                }
    
                const productExists = await OrdenProducto.findOne({
                    where: {
                        orden_id: dto.id,
                        producto_id: dto.producto.id,
                    },
                    transaction: t,
                });
    
                if (productExists) {
                    productExists.cantidad = dto.producto.cantidad;
                    await productExists.save({ transaction: t });
                } else {
                    await OrdenProducto.create(
                        {
                            orden_id: dto.id,
                            producto_id: dto.producto.id,
                            cantidad: dto.producto.cantidad,
                        },
                        { transaction: t }
                    );
                }
    
                const products = await OrdenProducto.findAll({
                    where: { orden_id: dto.id },
                    include: [{ model: Producto, as: "producto" }],
                    transaction: t,
                });
    
                let subtotal = products.reduce(
                    (sum, item) => sum + item.producto.precio * item.cantidad,
                    0
                );
                const iva = subtotal * 0.16;
                const total = subtotal + iva;
    
                await order.update({ subtotal, iva, total }, { transaction: t });

                const ordenActualizada = await Orden.findByPk(dto.id, {
                    include: [
                        {
                            model: OrdenProducto,
                            as: "productos",
                            attributes: ["producto_id", "cantidad"],
                            include: [{ model: Producto, as: "producto", attributes: ["id", "nombre"] }],
                        },
                    ],
                    transaction: t,
                });

                if (!ordenActualizada) {
                    throw CustomError.internalServer(`No se encontraron registros al actualizar los productos de la orden: ${dto.id}`)
                }
    
                return OrderEntity.fromObject(ordenActualizada);
            });
        } catch (error) {
            throw error;
        }
    }
    public async removeProduct(dto: RemoveProductOrderDto): Promise<OrderEntity> {
        try {
            return await sequelize.transaction(async (t) => {
                const orden = await Orden.findByPk(dto.id, {
                    include: [{ model: OrdenProducto, as: "productos" }],
                    transaction: t,
                });
    
                if (!orden) {
                    throw new Error("Orden no encontrada");
                }
    
                const productoOrden = await OrdenProducto.findOne({
                    where: {
                        orden_id: dto.id,
                        producto_id: dto.producto_id,
                    },
                    transaction: t,
                });
    
                if (!productoOrden) {
                    throw new Error(`El producto con ID ${dto.producto_id} no está en la orden`);
                }
    
                await productoOrden.destroy({ transaction: t });
    
                const productosRestantes = await OrdenProducto.findAll({
                    where: { orden_id: dto.id },
                    include: [{ model: Producto, as: "producto" }],
                    transaction: t,
                });
    
                let subtotal = productosRestantes.reduce(
                    (sum, item) => sum + item.producto.precio * item.cantidad,
                    0
                );
                const iva = subtotal * 0.16;
                const total = subtotal + iva;
    
                await orden.update({ subtotal, iva, total }, { transaction: t });
    
                const ordenActualizada = await Orden.findByPk(dto.id, {
                    include: [
                        {
                            model: OrdenProducto,
                            as: "productos",
                            attributes: ["producto_id", "cantidad"],
                            include: [{ model: Producto, as: "producto", attributes: ["id", "nombre"] }],
                        },
                    ],
                    transaction: t,
                });
    
                return OrderEntity.fromObject(ordenActualizada!);
            });
        } catch (error) {
            throw error;
        }
    }    
    public async delete(id: number) {
        try {

            const register = await Orden.findByPk(id);

            if (!register) {
                throw CustomError.notFound("Orden no encontrada");
            }

            await register.update({
                estatus_id: 4
            });

            // await Orden.destroy({ where: { id } });

        }
        catch (error) {
            throw error;
        }
    }
}