import { ProductIdentity } from '../product-identities/domain/product-identity';
import { ProductIdentitiesService } from '../product-identities/product-identities.service';

import { ProductImage } from '../product-images/domain/product-image';
import { ProductImagesService } from '../product-images/product-images.service';

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
    @Inject(forwardRef(() => ProductIdentitiesService))
    private readonly productIdentityService: ProductIdentitiesService,

    @Inject(forwardRef(() => ProductImagesService))
    private readonly productImageService: ProductImagesService,

    private readonly brandService: BrandsService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />

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

    let images: ProductImage[] | null | undefined = undefined;

    if (createProductDto.images) {
      const imagesObjects = await this.productImageService.findByIds(
        createProductDto.images.map((entity) => entity.id),
      );
      if (imagesObjects.length !== createProductDto.images.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            images: 'notExists',
          },
        });
      }
      images = imagesObjects;
    } else if (createProductDto.images === null) {
      images = null;
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
      basePrice: createProductDto.basePrice,

      screenSize: createProductDto.screenSize,

      pin: createProductDto.pin,

      screenTechnology: createProductDto.screenTechnology,

      chipset: createProductDto.chipset,

      os: createProductDto.os,

      seriCode: createProductDto.seriCode,

      identities,
      images,

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

    let images: ProductImage[] | null | undefined = undefined;

    if (updateProductDto.images) {
      const imagesObjects = await this.productImageService.findByIds(
        updateProductDto.images.map((entity) => entity.id),
      );
      if (imagesObjects.length !== updateProductDto.images.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            images: 'notExists',
          },
        });
      }
      images = imagesObjects;
    } else if (updateProductDto.images === null) {
      images = null;
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
      basePrice: updateProductDto.basePrice,

      screenSize: updateProductDto.screenSize,

      pin: updateProductDto.pin,

      screenTechnology: updateProductDto.screenTechnology,

      chipset: updateProductDto.chipset,

      os: updateProductDto.os,

      seriCode: updateProductDto.seriCode,

      identities,

      images,

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
