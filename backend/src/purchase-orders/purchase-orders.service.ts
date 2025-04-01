import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrderRepository } from './infrastructure/persistence/purchase-order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PurchaseOrder } from './domain/purchase-order';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly purchaseOrderRepository: PurchaseOrderRepository,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    const supplierObject = await this.supplierService.findById(
      createPurchaseOrderDto.supplier.id,
    );
    if (!supplierObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          supplier: 'notExists',
        },
      });
    }
    const supplier = supplierObject;

    return this.purchaseOrderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      supplier,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.purchaseOrderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PurchaseOrder['id']) {
    return this.purchaseOrderRepository.findById(id);
  }

  findByIds(ids: PurchaseOrder['id'][]) {
    return this.purchaseOrderRepository.findByIds(ids);
  }

  async update(
    id: PurchaseOrder['id'],

    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let supplier: Supplier | undefined = undefined;

    if (updatePurchaseOrderDto.supplier) {
      const supplierObject = await this.supplierService.findById(
        updatePurchaseOrderDto.supplier.id,
      );
      if (!supplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplier: 'notExists',
          },
        });
      }
      supplier = supplierObject;
    }

    return this.purchaseOrderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      supplier,
    });
  }

  remove(id: PurchaseOrder['id']) {
    return this.purchaseOrderRepository.remove(id);
  }
}
