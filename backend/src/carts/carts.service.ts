import { CartProductsService } from '../cart-products/cart-products.service';
import { CartProduct } from '../cart-products/domain/cart-product';

import { ProductsService } from '../products/products.service';

import { UsersService } from '../users/users.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { ColorsService } from 'src/colors/colors.service';
import { Cart } from './domain/cart';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './infrastructure/persistence/cart.repository';
import { CartStatus } from './carts.type';

@Injectable()
export class CartsService {
  constructor(
    @Inject(forwardRef(() => CartProductsService))
    private readonly cartProductService: CartProductsService,

    private readonly productService: ProductsService,

    private readonly userService: UsersService,
    private readonly colorService: ColorsService,

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

    const userObject = await this.userService.findById(createCartDto.user.id);
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.cartRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createCartDto.status,

      items,

      user,
    });
  }

  findCurrentCart(userId: string) {
    return this.cartRepository.findCurrentCart(userId);
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

    console.log(JSON.stringify(updateCartDto), 'updateCartDto');
    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cart: 'notExists',
        },
      });
    }
    let isFounded = false;
    cart.items = cart.items?.map((item) => {
      if (item.product.id === updateCartDto.productId) {
        item.quantity = updateCartDto.quantity;
        item.color.id = updateCartDto.colorId;
        isFounded = true;
      }
      return item;
    });
    cart.items = cart.items?.filter((item) => item.quantity > 0);

    const color = await this.colorService.findById(updateCartDto.colorId);
    if (!color) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          color: 'notExists',
        },
      });
    }

    const product = await this.productService.findById(updateCartDto.productId);
    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }

    if (!isFounded) {
      cart?.items?.push({
        product,
        quantity: updateCartDto.quantity,
        color,
      } as any);
    }

    return this.cartRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      items: cart.items,
    });
  }

  remove(id: Cart['id']) {
    return this.cartRepository.remove(id);
  }

  async updateCartStatus(id: Cart['id'], status: CartStatus) {
    // Do not remove comment below.
    // <updating-cart-status />

    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cart: 'notExists',
        },
      });
    }

    return this.cartRepository.update(id, {
      // Do not remove comment below.
      // <updating-cart-status-payload />
      status,
    });
  }
}
