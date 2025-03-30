import { CartProductsService } from '../cart-products/cart-products.service';
import { CartProduct } from '../cart-products/domain/cart-product';

import { ProductsService } from '../products/products.service';

import { User } from '../users/domain/user';
import { UsersService } from '../users/users.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Cart } from './domain/cart';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './infrastructure/persistence/cart.repository';

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

      userId,
    });
  }

  remove(id: Cart['id']) {
    return this.cartRepository.remove(id);
  }
}
