import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ProductModel } from '../../domain/product-model';

export abstract class ProductModelRepository {
  abstract create(
    data: Omit<ProductModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductModel>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductModel[]>;

  abstract findById(
    id: ProductModel['id'],
  ): Promise<NullableType<ProductModel>>;

  abstract findByIds(ids: ProductModel['id'][]): Promise<ProductModel[]>;

  abstract update(
    id: ProductModel['id'],
    payload: DeepPartial<ProductModel>,
  ): Promise<ProductModel | null>;

  abstract remove(id: ProductModel['id']): Promise<void>;
}
