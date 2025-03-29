import { CartProductsService } from '../cart-products/cart-products.service';
import { CartProduct } from '../cart-products/domain/cart-product';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './infrastructure/persistence/cart.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Cart } from './domain/cart';

@Injectable()
export class CartsService {
  constructor(
    @Inject(forwardRef(() => CartProductsService))
    private readonly cartProductService: CartProductsService,

    private readonly productService: ProductsService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly cartRepository: CartRepository,
  ) {}

  async create(createCartDto: CreateCartDto) {
    // Do not remove comment below.
    // <creating-property />
    let items: CartProduct[] | null | undefined = undefined;

    if (createCartDto.items) {
      const itemsObjects = await this.cartProductService.findByIds(
        createCartDto.items.map((entity) => entity.id),
      );
      if (itemsObjects.length !== createCartDto.items.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            items: 'notExists',
          },
        });
      }
      items = itemsObjects;
    } else if (createCartDto.items === null) {
      items = null;
    }

    let products: Product[] | null | undefined = undefined;

    if (createCartDto.products) {
      const productsObjects = await this.productService.findByIds(
        createCartDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== createCartDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (createCartDto.products === null) {
      products = null;
    }

    const userIdObject = await this.userService.findById(
      createCartDto.userId.id,
    );
    if (!userIdObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          userId: 'notExists',
        },
      });
    }
    const userId = userIdObject;

    return this.cartRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      items,

      products,

      userId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.cartRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Cart['id']) {
    return this.cartRepository.findById(id);
  }

  findByIds(ids: Cart['id'][]) {
    return this.cartRepository.findByIds(ids);
  }

  async update(
    id: Cart['id'],

    updateCartDto: UpdateCartDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let items: CartProduct[] | null | undefined = undefined;

    if (updateCartDto.items) {
      const itemsObjects = await this.cartProductService.findByIds(
        updateCartDto.items.map((entity) => entity.id),
      );
      if (itemsObjects.length !== updateCartDto.items.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            items: 'notExists',
          },
        });
      }
      items = itemsObjects;
    } else if (updateCartDto.items === null) {
      items = null;
    }

    let products: Product[] | null | undefined = undefined;

    if (updateCartDto.products) {
      const productsObjects = await this.productService.findByIds(
        updateCartDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== updateCartDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (updateCartDto.products === null) {
      products = null;
    }

    let userId: User | undefined = undefined;

    if (updateCartDto.userId) {
      const userIdObject = await this.userService.findById(
        updateCartDto.userId.id,
      );
      if (!userIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            userId: 'notExists',
          },
        });
      }
      userId = userIdObject;
    }

    return this.cartRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      items,

      products,

      userId,
    });
  }

  remove(id: Cart['id']) {
    return this.cartRepository.remove(id);
  }
}
