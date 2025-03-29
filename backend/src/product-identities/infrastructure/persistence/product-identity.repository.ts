import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ProductIdentity } from '../../domain/product-identity';

export abstract class ProductIdentityRepository {
  abstract create(
    data: Omit<ProductIdentity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductIdentity>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductIdentity[]>;

  abstract findById(
    id: ProductIdentity['id'],
  ): Promise<NullableType<ProductIdentity>>;

  abstract findByIds(ids: ProductIdentity['id'][]): Promise<ProductIdentity[]>;

  abstract update(
    id: ProductIdentity['id'],
    payload: DeepPartial<ProductIdentity>,
  ): Promise<ProductIdentity | null>;

  abstract remove(id: ProductIdentity['id']): Promise<void>;
}
