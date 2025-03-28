// service.interface.ts
export interface IService<T, FiltersDTO = T, CreateDTO = T, UpdateDTO = T> {
    // Obtener todas las entidades
    get(filters: FiltersDTO): Promise<T[]>;

    // Crear una nueva entidad
    create(item: CreateDTO): Promise<T>;
  
    // Actualizar una entidad
    update(item: UpdateDTO): Promise<T | null>;
  
    // Eliminar una entidad por su ID
    delete(id: number): Promise<void>;

}
  