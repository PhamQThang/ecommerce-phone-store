import { BrandsService } from '../brands/brands.service';
import { Brand } from '../brands/domain/brand';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateProductModelDto } from './dto/create-product-model.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';
import { ProductModelRepository } from './infrastructure/persistence/product-model.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductModel } from './domain/product-model';

@Injectable()
export class ProductModelsService {
  constructor(
    @Inject(forwardRef(() => BrandsService))
    private readonly brandService: BrandsService,

    // Dependencies here
    private readonly productModelRepository: ProductModelRepository,
  ) {}

  async create(createProductModelDto: CreateProductModelDto) {
    // Do not remove comment below.
    // <creating-property />

    const brandObject = await this.brandService.findById(
      createProductModelDto.brand.id,
    );
    if (!brandObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          brand: 'notExists',
        },
      });
    }
    const brand = brandObject;

    return this.productModelRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      code: createProductModelDto.code,

      brand,

      name: createProductModelDto.name,

      description: createProductModelDto.description,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productModelRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ProductModel['id']) {
    return this.productModelRepository.findById(id);
  }

  findByIds(ids: ProductModel['id'][]) {
    return this.productModelRepository.findByIds(ids);
  }

  async update(
    id: ProductModel['id'],

    updateProductModelDto: UpdateProductModelDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let brand: Brand | undefined = undefined;

    if (updateProductModelDto.brand) {
      const brandObject = await this.brandService.findById(
        updateProductModelDto.brand.id,
      );
      if (!brandObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            brand: 'notExists',
          },
        });
      }
      brand = brandObject;
    }

    return this.productModelRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      code: updateProductModelDto.code,

      brand,

      name: updateProductModelDto.name,

      description: updateProductModelDto.description,
    });
  }

  remove(id: ProductModel['id']) {
    return this.productModelRepository.remove(id);
  }
}
