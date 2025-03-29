import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Brand } from '../../domain/brand';

export abstract class BrandRepository {
  abstract create(
    data: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Brand>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Brand[]>;

  abstract findById(id: Brand['id']): Promise<NullableType<Brand>>;

  abstract findByIds(ids: Brand['id'][]): Promise<Brand[]>;

  abstract update(
    id: Brand['id'],
    payload: DeepPartial<Brand>,
  ): Promise<Brand | null>;

  abstract remove(id: Brand['id']): Promise<void>;
}
