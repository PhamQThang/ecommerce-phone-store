import { ProductsService } from '../products/products.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateProductIdentityDto } from './dto/create-product-identity.dto';
import { UpdateProductIdentityDto } from './dto/update-product-identity.dto';
import { ProductIdentityRepository } from './infrastructure/persistence/product-identity.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductIdentity } from './domain/product-identity';
import { Product } from '../products/domain/product';

@Injectable()
export class ProductIdentitiesService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,

    // Dependencies here
    private readonly productentityRepository: ProductIdentityRepository,
  ) {}

  async create(createProductIdentityDto: CreateProductIdentityDto) {
    // Do not remove comment below.
    // <creating-property />
    const productObject = await this.productService.findById(
      createProductIdentityDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    return this.productentityRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      product,

      status: createProductIdentityDto.status,

      imei: createProductIdentityDto.imei,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productentityRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ProductIdentity['id']) {
    return this.productentityRepository.findById(id);
  }

  findByIds(ids: ProductIdentity['id'][]) {
    return this.productentityRepository.findByIds(ids);
  }

  async update(
    id: ProductIdentity['id'],

    updateProductIdentityDto: UpdateProductIdentityDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let product: Product | undefined = undefined;

    if (updateProductIdentityDto.product) {
      const productObject = await this.productService.findById(
        updateProductIdentityDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    }

    return this.productentityRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      product,

      status: updateProductIdentityDto.status,

      imei: updateProductIdentityDto.imei,
    });
  }

  remove(id: ProductIdentity['id']) {
    return this.productentityRepository.remove(id);
  }
}
