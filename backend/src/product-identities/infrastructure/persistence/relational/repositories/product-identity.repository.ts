import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductIdentityEntity } from '../entities/product-identity.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ProductIdentity } from '../../../../domain/product-identity';
import { ProductIdentityRepository } from '../../product-identity.repository';
import { ProductIdentityMapper } from '../mappers/product-identity.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductIdentityRelationalRepository
  implements ProductIdentityRepository
{
  constructor(
    @InjectRepository(ProductIdentityEntity)
    private readonly productIdentityRepository: Repository<ProductIdentityEntity>,
  ) {}

  async create(data: ProductIdentity): Promise<ProductIdentity> {
    const persistenceModel = ProductIdentityMapper.toPersistence(data);
    const newEntity = await this.productIdentityRepository.save(
      this.productIdentityRepository.create(persistenceModel),
    );
    return ProductIdentityMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductIdentity[]> {
    const entities = await this.productIdentityRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProductIdentityMapper.toDomain(entity));
  }

  async findById(
    id: ProductIdentity['id'],
  ): Promise<NullableType<ProductIdentity>> {
    const entity = await this.productIdentityRepository.findOne({
      where: { id },
    });

    return entity ? ProductIdentityMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ProductIdentity['id'][]): Promise<ProductIdentity[]> {
    const entities = await this.productIdentityRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductIdentityMapper.toDomain(entity));
  }

  async update(
    id: ProductIdentity['id'],
    payload: Partial<ProductIdentity>,
  ): Promise<ProductIdentity> {
    const entity = await this.productIdentityRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productIdentityRepository.save(
      this.productIdentityRepository.create(
        ProductIdentityMapper.toPersistence({
          ...ProductIdentityMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductIdentityMapper.toDomain(updatedEntity);
  }

  async remove(id: ProductIdentity['id']): Promise<void> {
    await this.productIdentityRepository.delete(id);
  }
}
