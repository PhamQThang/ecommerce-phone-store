import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ProductImage } from '../../domain/product-image';

export abstract class ProductImageRepository {
  abstract create(
    data: Omit<ProductImage, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductImage>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductImage[]>;

  abstract findById(
    id: ProductImage['id'],
  ): Promise<NullableType<ProductImage>>;

  abstract findByIds(ids: ProductImage['id'][]): Promise<ProductImage[]>;

  abstract update(
    id: ProductImage['id'],
    payload: DeepPartial<ProductImage>,
  ): Promise<ProductImage | null>;

  abstract remove(id: ProductImage['id']): Promise<void>;
}
