import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductModelEntity } from '../entities/product-model.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ProductModel } from '../../../../domain/product-model';
import { ProductModelRepository } from '../../product-model.repository';
import { ProductModelMapper } from '../mappers/product-model.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductModelRelationalRepository
  implements ProductModelRepository
{
  constructor(
    @InjectRepository(ProductModelEntity)
    private readonly productModelRepository: Repository<ProductModelEntity>,
  ) {}

  async create(data: ProductModel): Promise<ProductModel> {
    const persistenceModel = ProductModelMapper.toPersistence(data);
    const newEntity = await this.productModelRepository.save(
      this.productModelRepository.create(persistenceModel),
    );
    return ProductModelMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductModel[]> {
    const entities = await this.productModelRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProductModelMapper.toDomain(entity));
  }

  async findById(id: ProductModel['id']): Promise<NullableType<ProductModel>> {
    const entity = await this.productModelRepository.findOne({
      where: { id },
    });

    return entity ? ProductModelMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ProductModel['id'][]): Promise<ProductModel[]> {
    const entities = await this.productModelRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductModelMapper.toDomain(entity));
  }

  async update(
    id: ProductModel['id'],
    payload: Partial<ProductModel>,
  ): Promise<ProductModel> {
    const entity = await this.productModelRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productModelRepository.save(
      this.productModelRepository.create(
        ProductModelMapper.toPersistence({
          ...ProductModelMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductModelMapper.toDomain(updatedEntity);
  }

  async remove(id: ProductModel['id']): Promise<void> {
    await this.productModelRepository.delete(id);
  }
}
