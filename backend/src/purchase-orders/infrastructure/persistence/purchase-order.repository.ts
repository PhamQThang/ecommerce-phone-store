import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PurchaseOrder } from '../../domain/purchase-order';

export abstract class PurchaseOrderRepository {
  abstract create(
    data: Omit<PurchaseOrder, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PurchaseOrder>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PurchaseOrder[]>;

  abstract findById(
    id: PurchaseOrder['id'],
  ): Promise<NullableType<PurchaseOrder>>;

  abstract findByIds(ids: PurchaseOrder['id'][]): Promise<PurchaseOrder[]>;

  abstract update(
    id: PurchaseOrder['id'],
    payload: DeepPartial<PurchaseOrder>,
  ): Promise<PurchaseOrder | null>;

  abstract remove(id: PurchaseOrder['id']): Promise<void>;
}
