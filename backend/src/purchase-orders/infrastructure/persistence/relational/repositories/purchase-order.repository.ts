import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PurchaseOrder } from '../../../../domain/purchase-order';
import { PurchaseOrderRepository } from '../../purchase-order.repository';
import { PurchaseOrderMapper } from '../mappers/purchase-order.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PurchaseOrderRelationalRepository
  implements PurchaseOrderRepository
{
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderEntity>,
  ) {}

  async create(data: PurchaseOrder): Promise<PurchaseOrder> {
    const persistenceModel = PurchaseOrderMapper.toPersistence(data);
    const newEntity = await this.purchaseOrderRepository.save(
      this.purchaseOrderRepository.create(persistenceModel),
    );
    return PurchaseOrderMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PurchaseOrder[]> {
    const entities = await this.purchaseOrderRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PurchaseOrderMapper.toDomain(entity));
  }

  async findById(
    id: PurchaseOrder['id'],
  ): Promise<NullableType<PurchaseOrder>> {
    const entity = await this.purchaseOrderRepository.findOne({
      where: { id },
    });

    return entity ? PurchaseOrderMapper.toDomain(entity) : null;
  }

  async findByIds(ids: PurchaseOrder['id'][]): Promise<PurchaseOrder[]> {
    const entities = await this.purchaseOrderRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PurchaseOrderMapper.toDomain(entity));
  }

  async update(
    id: PurchaseOrder['id'],
    payload: Partial<PurchaseOrder>,
  ): Promise<PurchaseOrder> {
    const entity = await this.purchaseOrderRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.purchaseOrderRepository.save(
      this.purchaseOrderRepository.create(
        PurchaseOrderMapper.toPersistence({
          ...PurchaseOrderMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PurchaseOrderMapper.toDomain(updatedEntity);
  }

  async remove(id: PurchaseOrder['id']): Promise<void> {
    await this.purchaseOrderRepository.delete(id);
  }
}
