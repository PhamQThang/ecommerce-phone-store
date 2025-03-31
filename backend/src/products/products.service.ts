import { ProductModel } from '../product-models/domain/product-model';
import { ProductModelsService } from '../product-models/product-models.service';

import { ProductIdentity } from '../product-identities/domain/product-identity';
import { ProductIdentitiesService } from '../product-identities/product-identities.service';

import { BrandsService } from '../brands/brands.service';
import { Brand } from '../brands/domain/brand';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productModelService: ProductModelsService,

    @Inject(forwardRef(() => ProductIdentitiesService))
    private readonly productIdentityService: ProductIdentitiesService,

    private readonly brandService: BrandsService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />
    const modelObject = await this.productModelService.findById(
      createProductDto.model.id,
    );
    if (!modelObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          model: 'notExists',
        },
      });
    }
    const model = modelObject;

    let identities: ProductIdentity[] | null | undefined = undefined;

    if (createProductDto.identities) {
      const identitiesObjects = await this.productIdentityService.findByIds(
        createProductDto.identities.map((entity) => entity.id),
      );
      if (identitiesObjects.length !== createProductDto.identities.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            identities: 'notExists',
          },
        });
      }
      identities = identitiesObjects;
    } else if (createProductDto.identities === null) {
      identities = null;
    }

    const brandObject = await this.brandService.findById(
      createProductDto.brand.id,
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

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      model,

      basePrice: createProductDto.basePrice,

      screenSize: createProductDto.screenSize,

      pin: createProductDto.pin,

      screenTechnology: createProductDto.screenTechnology,

      chipset: createProductDto.chipset,

      os: createProductDto.os,

      identities,
      images: createProductDto.images,

      storage: createProductDto.storage,

      ram: createProductDto.ram,

      slug: createProductDto.slug,

      brand,

      name: createProductDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Product['id'], isAdmin = false) {
    return this.productRepository.findById(id, isAdmin);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let model: ProductModel | undefined = undefined;

    if (updateProductDto.model) {
      const modelObject = await this.productModelService.findById(
        updateProductDto.model.id,
      );
      if (!modelObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            model: 'notExists',
          },
        });
      }
      model = modelObject;
    }

    let identities: ProductIdentity[] | null | undefined = undefined;

    if (updateProductDto.identities) {
      const identitiesObjects = await this.productIdentityService.findByIds(
        updateProductDto.identities.map((entity) => entity.id),
      );
      if (identitiesObjects.length !== updateProductDto.identities.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            identities: 'notExists',
          },
        });
      }
      identities = identitiesObjects;
    } else if (updateProductDto.identities === null) {
      identities = null;
    }

    let brand: Brand | undefined = undefined;

    if (updateProductDto.brand) {
      const brandObject = await this.brandService.findById(
        updateProductDto.brand.id,
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

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      model,

      basePrice: updateProductDto.basePrice,

      screenSize: updateProductDto.screenSize,

      pin: updateProductDto.pin,

      screenTechnology: updateProductDto.screenTechnology,

      chipset: updateProductDto.chipset,

      os: updateProductDto.os,

      identities,

      images: updateProductDto.images,

      storage: updateProductDto.storage,

      ram: updateProductDto.ram,

      slug: updateProductDto.slug,

      brand,

      name: updateProductDto.name,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
