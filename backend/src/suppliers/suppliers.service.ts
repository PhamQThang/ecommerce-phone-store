import { ProductIdentity } from '../product-identities/domain/product-identity';
import { ProductIdentitiesService } from '../product-identities/product-identities.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Supplier } from './domain/supplier';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject(forwardRef(() => ProductIdentitiesService))
    private readonly productIdentityService: ProductIdentitiesService,

    // Dependencies here
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    // Do not remove comment below.
    // <creating-property />
    let productIdentity: ProductIdentity[] | null | undefined = undefined;

    if (createSupplierDto.productIdentity) {
      const productIdentityObjects =
        await this.productIdentityService.findByIds(
          createSupplierDto.productIdentity.map((entity) => entity.id),
        );
      if (
        productIdentityObjects.length !==
        createSupplierDto.productIdentity.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productIdentity: 'notExists',
          },
        });
      }
      productIdentity = productIdentityObjects;
    } else if (createSupplierDto.productIdentity === null) {
      productIdentity = null;
    }

    return this.supplierRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      productIdentity,

      address: createSupplierDto.address,

      phoneNumber: createSupplierDto.phoneNumber,

      name: createSupplierDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Supplier['id']) {
    return this.supplierRepository.findById(id);
  }

  findByIds(ids: Supplier['id'][]) {
    return this.supplierRepository.findByIds(ids);
  }

  async update(
    id: Supplier['id'],

    updateSupplierDto: UpdateSupplierDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let productIdentity: ProductIdentity[] | null | undefined = undefined;

    if (updateSupplierDto.productIdentity) {
      const productIdentityObjects =
        await this.productIdentityService.findByIds(
          updateSupplierDto.productIdentity.map((entity) => entity.id),
        );
      if (
        productIdentityObjects.length !==
        updateSupplierDto.productIdentity.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productIdentity: 'notExists',
          },
        });
      }
      productIdentity = productIdentityObjects;
    } else if (updateSupplierDto.productIdentity === null) {
      productIdentity = null;
    }

    return this.supplierRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      productIdentity,

      address: updateSupplierDto.address,

      phoneNumber: updateSupplierDto.phoneNumber,

      name: updateSupplierDto.name,
    });
  }

  remove(id: Supplier['id']) {
    return this.supplierRepository.remove(id);
  }
}
