import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, FindOptionsWhereProperty, Repository } from "typeorm";
import { BaseInterfaceRepository } from "./base.interfaces";
import { AsyncContextService } from "src/common/async-context.service";

interface HasSaasId {
    id: number,
    saasId: number
}

export abstract class BaseAbstractRepostitory<T extends HasSaasId> implements BaseInterfaceRepository<T>{
    private asyncContextService: AsyncContextService
    private entity: Repository<T>

    protected constructor(entity: Repository<T>) {
        this.entity = entity
        this.asyncContextService = new AsyncContextService();
    }

    public async save(data: DeepPartial<T>): Promise<T> {
        return await this.entity.save(data)
    }

    public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
        return this.entity.save(data)
    }

    public create(data: DeepPartial<T>): T {
        const saasId = this.getSaasId()
        const dataWithSaasId: DeepPartial<T> = {
            ...data,
            saasId: +saasId
        };
        return this.entity.create(dataWithSaasId)
    }

    public createMany(data: DeepPartial<T>[]): T[] {
        return this.entity.create(data);
    }

    public async update(id: number, data: DeepPartial<T>): Promise<T> {
        const record = await this.findOneById(id)
        const updatedRecord = this.entity.merge(record, data)
        return await this.entity.save(updatedRecord)
    }

    public async findOneById(id: number): Promise<T> {
        const saasId = this.getSaasId()
        
        const options: FindOptionsWhere<T> = {
            id: id,
            saasId: +saasId
        } as FindOptionsWhere<T>;
    
        return await this.entity.findOneBy(options)
    }

    public async findByCondition(filterCondition: any): Promise<T> {
        const saasId = this.getSaasId() 
        filterCondition.saasId = +saasId
        return await this.entity.findOneBy(filterCondition)
    }

    public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
        return await this.entity.find(relations)
    }

    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        const saasId = this.getSaasId()
        const optionsWithSaasId: FindManyOptions<T> = {
            ...options,
            where: {
                ...options?.where,
                saasId: +saasId as any
            }
        }
        
        return await this.entity.find(optionsWithSaasId)
    }

    public async remove(id: number): Promise<T> {
        const record = await this.findOneById(id)
        return await this.entity.remove(record)
    }

    public async preload(entityLike: DeepPartial<T>): Promise<T> {
        return await this.entity.preload(entityLike)
    }

    public async findOne(options: FindOneOptions<T>): Promise<T> {
        return this.entity.findOne(options)
    }

    private getSaasId(): number {
        const saasId = this.asyncContextService.getSaasId();
        if (!saasId) {
            throw new Error("saasId não está disponível no contexto atual.");
        }
        return +saasId;
    }
}
