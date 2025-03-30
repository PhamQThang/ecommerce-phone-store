import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CartProduct } from '../../domain/cart-product';

export abstract class CartProductRepository {
  abstract create(
    data: Omit<CartProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CartProduct>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CartProduct[]>;

  abstract findById(id: CartProduct['id']): Promise<NullableType<CartProduct>>;

  abstract findByIds(ids: CartProduct['id'][]): Promise<CartProduct[]>;

  abstract update(
    id: CartProduct['id'],
    payload: DeepPartial<CartProduct>,
  ): Promise<CartProduct | null>;

  abstract remove(id: CartProduct['id']): Promise<void>;
}
