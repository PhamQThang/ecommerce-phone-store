import { ProductModelsService } from '../product-models/product-models.service';
import { ProductModel } from '../product-models/domain/product-model';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './infrastructure/persistence/brand.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Brand } from './domain/brand';

@Injectable()
export class BrandsService {
  constructor(
    @Inject(forwardRef(() => ProductModelsService))
    private readonly productModelService: ProductModelsService,

    // Dependencies here
    private readonly brandRepository: BrandRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    // Do not remove comment below.
    // <creating-property />
    const modelsObjects = await this.productModelService.findByIds(
      createBrandDto.models.map((entity) => entity.id),
    );
    if (modelsObjects.length !== createBrandDto.models.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          models: 'notExists',
        },
      });
    }
    const models = modelsObjects;

    return this.brandRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      models,

      slug: createBrandDto.slug,

      name: createBrandDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.brandRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Brand['id']) {
    return this.brandRepository.findById(id);
  }

  findByIds(ids: Brand['id'][]) {
    return this.brandRepository.findByIds(ids);
  }

  async update(
    id: Brand['id'],

    updateBrandDto: UpdateBrandDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let models: ProductModel[] | undefined = undefined;

    if (updateBrandDto.models) {
      const modelsObjects = await this.productModelService.findByIds(
        updateBrandDto.models.map((entity) => entity.id),
      );
      if (modelsObjects.length !== updateBrandDto.models.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            models: 'notExists',
          },
        });
      }
      models = modelsObjects;
    }

    return this.brandRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      models,

      slug: updateBrandDto.slug,

      name: updateBrandDto.name,
    });
  }

  remove(id: Brand['id']) {
    return this.brandRepository.remove(id);
  }
}
