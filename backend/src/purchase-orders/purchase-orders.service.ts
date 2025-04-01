import { ProductIdentity } from '../product-identities/domain/product-identity';
import { ProductIdentitiesService } from '../product-identities/product-identities.service';

import { Supplier } from '../suppliers/domain/supplier';
import { SuppliersService } from '../suppliers/suppliers.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PurchaseOrder } from './domain/purchase-order';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrderRepository } from './infrastructure/persistence/purchase-order.repository';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @Inject(forwardRef(() => ProductIdentitiesService))
    private readonly productIdentityService: ProductIdentitiesService,

    @Inject(forwardRef(() => SuppliersService))
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly purchaseOrderRepository: PurchaseOrderRepository,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    let productIdentites: ProductIdentity[] | null | undefined = undefined;

    if (createPurchaseOrderDto.productIdentites) {
      const productIdentitesObjects =
        await this.productIdentityService.findByIds(
          createPurchaseOrderDto.productIdentites.map((entity) => entity.id),
        );
      if (
        productIdentitesObjects.length !==
        createPurchaseOrderDto.productIdentites.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productIdentites: 'notExists',
          },
        });
      }
      productIdentites = productIdentitesObjects;
    } else if (createPurchaseOrderDto.productIdentites === null) {
      productIdentites = null;
    }

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
      productIdentites,

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
    let productIdentites: ProductIdentity[] | null | undefined = undefined;

    if (updatePurchaseOrderDto.productIdentites) {
      const productIdentitesObjects =
        await this.productIdentityService.findByIds(
          updatePurchaseOrderDto.productIdentites.map((entity) => entity.id),
        );
      if (
        productIdentitesObjects.length !==
        updatePurchaseOrderDto.productIdentites.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productIdentites: 'notExists',
          },
        });
      }
      productIdentites = productIdentitesObjects;
    } else if (updatePurchaseOrderDto.productIdentites === null) {
      productIdentites = null;
    }

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
      productIdentites,

      supplier,
    });
  }

  remove(id: PurchaseOrder['id']) {
    return this.purchaseOrderRepository.remove(id);
  }
}
