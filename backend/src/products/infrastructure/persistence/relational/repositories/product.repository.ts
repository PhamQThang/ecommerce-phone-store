import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionRepository } from 'src/promotions/infrastructure/persistence/promotion.repository';
import { In, Repository } from 'typeorm';
import { ProductIdentityMapper } from '../../../../../product-identities/infrastructure/persistence/relational/mappers/product-identity.mapper';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Product } from '../../../../domain/product';
import { ProductRepository } from '../../product.repository';
import { ProductEntity } from '../entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductRelationalRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly promotionRepository: PromotionRepository,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const newEntity = await this.productRepository.save(
      this.productRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const entities = await this.productRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    const promotions = await this.promotionRepository.findPromotionsByProducts(
      entities.map((entity) => entity.id),
    );

    const products = entities.map((entity) => ProductMapper.toDomain(entity));
    products.forEach((product) => {
      product.discount = promotions?.find((promotion) =>
        promotion?.products?.some((item) => item.id === product.id),
      )?.discount;
    });
    return products;
  }

  async findById(
    id: Product['id'],
    isAdmin?: boolean,
  ): Promise<NullableType<Product>> {
    const entity = await this.productRepository.findOne({
      where: { id },
    });
    if (!entity) return null;
    const result = ProductMapper.toDomain(entity);
    if (entity.identities?.length && isAdmin) {
      result.identities = entity.identities.map((item) =>
        ProductIdentityMapper.toDomain(item),
      );
    }

    const promotions = await this.promotionRepository.findPromotionsByProducts([
      entity.id,
    ]);

    result.discount = promotions?.find((promotion) =>
      promotion?.products?.some((item) => item.id === result.id),
    )?.discount;

    return result;
  }

  async findByIds(ids: Product['id'][]): Promise<Product[]> {
    const entities = await this.productRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async update(id: Product['id'], payload: Partial<Product>): Promise<Product> {
    const entity = await this.productRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productRepository.save(
      this.productRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productRepository.delete(id);
  }
}
