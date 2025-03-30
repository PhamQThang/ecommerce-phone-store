import { CartsService } from '../carts/carts.service';
import { ColorsService } from '../colors/colors.service';
import { Color } from '../colors/domain/color';

import { Product } from '../products/domain/product';
import { ProductsService } from '../products/products.service';

import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cart } from 'src/carts/domain/cart';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CartProduct } from './domain/cart-product';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import { CartProductRepository } from './infrastructure/persistence/cart-product.repository';

@Injectable()
export class CartProductsService {
  constructor(
    @Inject(forwardRef(() => CartsService))
    private readonly cartService: CartsService,

    private readonly colorService: ColorsService,

    private readonly productService: ProductsService,

    // Dependencies here
    private readonly cartProductRepository: CartProductRepository,
  ) {}

  async create(createCartProductDto: CreateCartProductDto) {
    // Do not remove comment below.
    // <creating-property />
    const cartObject = await this.cartService.findById(
      createCartProductDto.cart.id,
    );
    if (!cartObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cart: 'notExists',
        },
      });
    }
    const cart = cartObject;

    const colorObject = await this.colorService.findById(
      createCartProductDto.color.id,
    );
    if (!colorObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          color: 'notExists',
        },
      });
    }
    const color = colorObject;

    const productObject = await this.productService.findById(
      createCartProductDto.product.id,
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

    return this.cartProductRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      cart,

      color,

      quantity: createCartProductDto.quantity,

      product,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.cartProductRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: CartProduct['id']) {
    return this.cartProductRepository.findById(id);
  }

  findByIds(ids: CartProduct['id'][]) {
    return this.cartProductRepository.findByIds(ids);
  }

  async update(
    id: CartProduct['id'],

    updateCartProductDto: UpdateCartProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let cart: Cart | undefined = undefined;

    if (updateCartProductDto.cart) {
      const cartObject = await this.cartService.findById(
        updateCartProductDto.cart.id,
      );
      if (!cartObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            cart: 'notExists',
          },
        });
      }
      cart = cartObject;
    }

    let color: Color | undefined = undefined;

    if (updateCartProductDto.color) {
      const colorObject = await this.colorService.findById(
        updateCartProductDto.color.id,
      );
      if (!colorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            color: 'notExists',
          },
        });
      }
      color = colorObject;
    }

    let product: Product | undefined = undefined;

    if (updateCartProductDto.product) {
      const productObject = await this.productService.findById(
        updateCartProductDto.product.id,
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

    return this.cartProductRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      cart,

      color,

      quantity: updateCartProductDto.quantity,

      product,
    });
  }

  remove(id: CartProduct['id']) {
    return this.cartProductRepository.remove(id);
  }
}
