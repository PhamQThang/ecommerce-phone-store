import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductIdentityEntity } from 'src/product-identities/infrastructure/persistence/relational/entities/product-identity.entity';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { PurchaseOrder } from '../../../../domain/purchase-order';
import { PurchaseOrderRepository } from '../../purchase-order.repository';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { PurchaseOrderMapper } from '../mappers/purchase-order.mapper';

@Injectable()
export class PurchaseOrderRelationalRepository
  implements PurchaseOrderRepository
{
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderEntity>,
    @InjectRepository(ProductIdentityEntity)
    private readonly productIdentityRepository: Repository<ProductIdentityEntity>,
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

    if (!entity) {
      return null;
    }

    if (entity.productIdentites) {
      for (const productIdentity of entity.productIdentites) {
        const identity = await this.productIdentityRepository.findOne({
          where: { id: productIdentity.id },
          relations: ['product'],
        });
        if (identity) {
          productIdentity.product = identity.product;
        }
      }
    }

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
