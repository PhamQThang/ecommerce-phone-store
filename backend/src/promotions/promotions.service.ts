import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from './infrastructure/persistence/promotion.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Promotion } from './domain/promotion';

@Injectable()
export class PromotionsService {
  constructor(
    private readonly productService: ProductsService,

    // Dependencies here
    private readonly promotionRepository: PromotionRepository,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    // Do not remove comment below.
    // <creating-property />
    let products: Product[] | null | undefined = undefined;

    if (createPromotionDto.products) {
      const productsObjects = await this.productService.findByIds(
        createPromotionDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== createPromotionDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (createPromotionDto.products === null) {
      products = null;
    }

    return this.promotionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      products,

      discount: createPromotionDto.discount,

      description: createPromotionDto.description,

      endDate: createPromotionDto.endDate,

      startDate: createPromotionDto.startDate,

      name: createPromotionDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.promotionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Promotion['id']) {
    return this.promotionRepository.findById(id);
  }

  findByIds(ids: Promotion['id'][]) {
    return this.promotionRepository.findByIds(ids);
  }

  async update(
    id: Promotion['id'],

    updatePromotionDto: UpdatePromotionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let products: Product[] | null | undefined = undefined;

    if (updatePromotionDto.products) {
      const productsObjects = await this.productService.findByIds(
        updatePromotionDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== updatePromotionDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (updatePromotionDto.products === null) {
      products = null;
    }

    return this.promotionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      products,

      discount: updatePromotionDto.discount,

      description: updatePromotionDto.description,

      endDate: updatePromotionDto.endDate,

      startDate: updatePromotionDto.startDate,

      name: updatePromotionDto.name,
    });
  }

  remove(id: Promotion['id']) {
    return this.promotionRepository.remove(id);
  }
}
