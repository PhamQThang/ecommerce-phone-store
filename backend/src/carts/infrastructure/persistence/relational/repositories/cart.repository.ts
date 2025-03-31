import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartStatus } from 'src/carts/carts.type';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Cart } from '../../../../domain/cart';
import { CartRepository } from '../../cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { CartMapper } from '../mappers/cart.mapper';

@Injectable()
export class CartRelationalRepository implements CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async create(data: Cart): Promise<Cart> {
    const persistenceModel = CartMapper.toPersistence(data);
    const newEntity = await this.cartRepository.save(
      this.cartRepository.create(persistenceModel),
    );
    return CartMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Cart[]> {
    const entities = await this.cartRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        status: CartStatus.IN_PROGRESS,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities.map((entity) => CartMapper.toDomain(entity));
  }

  async findById(id: Cart['id']): Promise<NullableType<Cart>> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    return entity ? CartMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Cart['id'][]): Promise<Cart[]> {
    const entities = await this.cartRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CartMapper.toDomain(entity));
  }

  async update(id: Cart['id'], payload: Partial<Cart>): Promise<Cart> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cartRepository.save(
      this.cartRepository.create(
        CartMapper.toPersistence({
          ...CartMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CartMapper.toDomain(updatedEntity);
  }

  async remove(id: Cart['id']): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
