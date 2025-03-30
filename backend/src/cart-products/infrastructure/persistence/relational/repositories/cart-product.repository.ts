import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CartProduct } from '../../../../domain/cart-product';
import { CartProductRepository } from '../../cart-product.repository';
import { CartProductMapper } from '../mappers/cart-product.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CartProductRelationalRepository implements CartProductRepository {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
  ) {}

  async create(data: CartProduct): Promise<CartProduct> {
    const persistenceModel = CartProductMapper.toPersistence(data);
    const newEntity = await this.cartProductRepository.save(
      this.cartProductRepository.create(persistenceModel),
    );
    return CartProductMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CartProduct[]> {
    const entities = await this.cartProductRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CartProductMapper.toDomain(entity));
  }

  async findById(id: CartProduct['id']): Promise<NullableType<CartProduct>> {
    const entity = await this.cartProductRepository.findOne({
      where: { id },
    });

    return entity ? CartProductMapper.toDomain(entity) : null;
  }

  async findByIds(ids: CartProduct['id'][]): Promise<CartProduct[]> {
    const entities = await this.cartProductRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CartProductMapper.toDomain(entity));
  }

  async update(
    id: CartProduct['id'],
    payload: Partial<CartProduct>,
  ): Promise<CartProduct> {
    const entity = await this.cartProductRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cartProductRepository.save(
      this.cartProductRepository.create(
        CartProductMapper.toPersistence({
          ...CartProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CartProductMapper.toDomain(updatedEntity);
  }

  async remove(id: CartProduct['id']): Promise<void> {
    await this.cartProductRepository.delete(id);
  }
}
