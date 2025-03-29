import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductImageEntity } from '../entities/product-image.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ProductImage } from '../../../../domain/product-image';
import { ProductImageRepository } from '../../product-image.repository';
import { ProductImageMapper } from '../mappers/product-image.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductImageRelationalRepository
  implements ProductImageRepository
{
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async create(data: ProductImage): Promise<ProductImage> {
    const persistenceModel = ProductImageMapper.toPersistence(data);
    const newEntity = await this.productImageRepository.save(
      this.productImageRepository.create(persistenceModel),
    );
    return ProductImageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductImage[]> {
    const entities = await this.productImageRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProductImageMapper.toDomain(entity));
  }

  async findById(id: ProductImage['id']): Promise<NullableType<ProductImage>> {
    const entity = await this.productImageRepository.findOne({
      where: { id },
    });

    return entity ? ProductImageMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ProductImage['id'][]): Promise<ProductImage[]> {
    const entities = await this.productImageRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductImageMapper.toDomain(entity));
  }

  async update(
    id: ProductImage['id'],
    payload: Partial<ProductImage>,
  ): Promise<ProductImage> {
    const entity = await this.productImageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productImageRepository.save(
      this.productImageRepository.create(
        ProductImageMapper.toPersistence({
          ...ProductImageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductImageMapper.toDomain(updatedEntity);
  }

  async remove(id: ProductImage['id']): Promise<void> {
    await this.productImageRepository.delete(id);
  }
}
