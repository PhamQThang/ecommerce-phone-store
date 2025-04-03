import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartStatus } from 'src/carts/carts.type';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Cart } from '../../../../domain/cart';
import { CartRepository } from '../../cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { CartMapper } from '../mappers/cart.mapper';
import { PromotionRepository } from 'src/promotions/infrastructure/persistence/promotion.repository';

@Injectable()
export class CartRelationalRepository implements CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(PromotionRepository)
    private readonly promotionRepository: PromotionRepository,
  ) {}

  async create(data: Cart): Promise<Cart> {
    const persistenceModel = CartMapper.toPersistence(data);
    const newEntity = await this.cartRepository.save(
      this.cartRepository.create(persistenceModel),
    );
    return CartMapper.toDomain(newEntity);
  }

  async findCurrentCart(userId: string): Promise<Cart> {
    const entities = await this.cartRepository.find({
      skip: 0,
      take: 1,
      where: {
        status: CartStatus.IN_PROGRESS,
        user: {
          id: userId,
        } as any,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!entities.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'cartNotFound',
        },
      });
    }

    const cart = CartMapper.toDomain(entities[0]);
    const productIds = cart.items?.map((item) => item.product.id) || [];
    const promotions =
      await this.promotionRepository.findPromotionsByProducts(productIds);

    cart.items?.forEach((product) => {
      product.product.discount = promotions?.find((promotion) =>
        promotion?.products?.some((item) => item.id === product.id),
      )?.discount;
    });
    return cart;
  }

  async findById(id: Cart['id']): Promise<NullableType<Cart>> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    if (!entity) return null;
    const cart = CartMapper.toDomain(entity);
    const productIds = cart.items?.map((item) => item.product.id) || [];
    const promotions =
      await this.promotionRepository.findPromotionsByProducts(productIds);

    cart.items?.forEach((product) => {
      product.product.discount = promotions?.find((promotion) =>
        promotion?.products?.some((item) => item.id === product.id),
      )?.discount;
    });

    return cart;
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
