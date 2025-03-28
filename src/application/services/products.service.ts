import { ProductEntity, CreateProductDto, CustomError, GetProductsDto, IService, UpdateProductDto } from '../../domain';
import { BusinessRepository, ProductsRepository } from '../../infrastructure';


export class ProductsService implements IService
    <
        ProductEntity, 
        GetProductsDto,
        CreateProductDto, 
        UpdateProductDto
    > 
{

    constructor(
        private readonly _productRepository: ProductsRepository,
        private readonly _businessRepository: BusinessRepository
    ) {}

    public async checkName(name: string) {
        const exists = await this._productRepository.findByName(name);
        
        if ( exists ) throw CustomError.badRequest('Name already exist');
    }
    public async checkProperty(id_business: number, id_user: number) {
        const exists = await this._businessRepository.findById(id_business);
        
        if ( !exists ) throw CustomError.badRequest('Busines doesn\'t exists');

        if ( exists.id_owner !== id_user ) throw CustomError.forbidden('You don\'t have access to this resource');
    }
    public async checkPropertyByIdProduct(id_product: number, id_user: number) {
        const product = await this._productRepository.findById(id_product);

        if ( !product ) throw CustomError.badRequest('Product doesn\'t exists');

        const business = await this._businessRepository.findById(product.id_business);
        
        if ( !business ) throw CustomError.badRequest('Busines doesn\'t exists');

        if ( business.id_owner !== id_user ) throw CustomError.forbidden('You don\'t have access to this resource');
    }
    public async get(filters: GetProductsDto): Promise<ProductEntity[]> {
        try {

            const foundBusiness = await this._productRepository.get({
                ...filters
            });
        
            if ( !foundBusiness ) throw CustomError.notFound('No se encontraron registros');

            return foundBusiness;

        } catch (error) {
            throw error;
        }
    }
    public async create(item: CreateProductDto): Promise<ProductEntity> {
        try {

            await this.checkProperty(item.negocio_id, item.user_id);
            await this.checkName(item.nombre);
      
            const newEntity = await this._productRepository.create(item);
      
            return newEntity;
      
        } catch (error) {
            throw error;
        }
    }
    public async update(item: UpdateProductDto): Promise<ProductEntity | null> {
        try {

            const product = await this._productRepository.findById(item.id);
      
            if (!product) throw CustomError.badRequest('Register doesn\'t exists');

            await this.checkProperty(product.id_business, item.user_id);
            await this.checkName(item.nombre);

            const updated = await this._productRepository.update({
                ...item
            });

            return updated;

        } catch (error) {
            throw error;
        }
    }
    public async delete(id: number): Promise<void> {
        try {

            const toDelete = await this._productRepository.findById(id);
      
            if (!toDelete) throw CustomError.badRequest('Register doesn\'t exists');

            await this._productRepository.delete(id);

        } catch (error) {
            throw error;
        }
    }


}