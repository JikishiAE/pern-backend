// repository.interface.ts
export interface IRepository<T, FiltersDTO = T, CreateDTO = T, UpdateDTO = T> {

    // Obtener todas las entidades
    get(filters: FiltersDTO): Promise<T[]>;

    // Crear una nueva entidad
    create(item: CreateDTO): Promise<T>;
  
    // Obtener una entidad por su ID
    findById(id: number): Promise<T | null>;
  
    // Actualizar una entidad
    update(item: UpdateDTO): Promise<T | null>;
  
    // Eliminar una entidad por su ID
    delete(id: number): Promise<void>;

}
  