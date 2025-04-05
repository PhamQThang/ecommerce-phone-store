import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Promotion } from '../../domain/promotion';

export abstract class PromotionRepository {
  abstract create(
    data: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Promotion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Promotion[]>;

  abstract findById(id: Promotion['id']): Promise<NullableType<Promotion>>;

  abstract findByIds(ids: Promotion['id'][]): Promise<Promotion[]>;

  abstract update(
    id: Promotion['id'],
    payload: DeepPartial<Promotion>,
  ): Promise<Promotion | null>;

  abstract remove(id: Promotion['id']): Promise<void>;

  abstract findPromotionsByProducts(productIds: string[]): Promise<Promotion[]>;
}
