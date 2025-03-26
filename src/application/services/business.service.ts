import { BusinessEntity, CreateBusinessDto, CustomError, GetBusinessDto, IService, UpdateBusinessDto } from '../../domain';
import { BusinessRepository } from '../../infrastructure/repositories/business/business.repository';


export class BusinessService implements IService
    <
        BusinessEntity, 
        GetBusinessDto,
        CreateBusinessDto, 
        UpdateBusinessDto
    > 
{

    constructor(
        private readonly _businessRepository: BusinessRepository
    ) {}

    public async checkName(name: string) {
        const exists = await this._businessRepository.findByName(name);
        
        if ( exists ) throw CustomError.badRequest('Name already exist');
    }
    public async get(filters: GetBusinessDto): Promise<BusinessEntity[]> {
        try {

            const foundBusiness = await this._businessRepository.get({
                ...filters
            });
        
            if ( !foundBusiness ) throw CustomError.notFound('No se encontraron registros');

            return foundBusiness;

        } catch (error) {
            throw error;
        }
    }
    public async create(item: CreateBusinessDto): Promise<BusinessEntity> {
        try {

            await this.checkName(item.nombre);
      
            const newEntity = await this._businessRepository.create(item);
      
            return newEntity;
      
        } catch (error) {
            throw error;
        }
    }
    public async update(item: UpdateBusinessDto): Promise<BusinessEntity | null> {
        try {

            await this.checkName(item.nombre);

            const user = await this._businessRepository.findById(item.id);
      
            if (!user) throw CustomError.badRequest('Register doesn\'t exists');

            const updated = await this._businessRepository.update({
                ...item
            });

            return updated;

        } catch (error) {
            throw error;
        }
    }
    public async delete(id: number): Promise<void> {
        try {

            const toDelete = await this._businessRepository.findById(id);
      
            if (!toDelete) throw CustomError.badRequest('Register doesn\'t exists');

            await this._businessRepository.delete(id);

        } catch (error) {
            throw error;
        }
    }


}