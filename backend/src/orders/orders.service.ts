import { Product } from '../products/domain/product';
import { ProductsService } from '../products/products.service';

import { User } from '../users/domain/user';
import { UsersService } from '../users/users.service';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CartsService } from '../carts/carts.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { OrderStatus } from './orders.type';
import { OrderProduct } from './domain/order-product';

@Injectable()
export class OrdersService {
  constructor(
    private readonly productService: ProductsService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,

    private readonly cartService: CartsService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    const cartObject = await this.cartService.findById(createOrderDto.cartId);
    if (!cartObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'notExists',
        },
      });
    }

    if (userId !== cartObject.user.id) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'notBelongsToUser',
        },
      });
    }
    if (cartObject.status !== 'PENDING') {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'notPending',
        },
      });
    }

    const cartItems = cartObject?.items || [];
    if (cartItems.length === 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          items: 'itemsMustNotBeEmpty',
        },
      });
    }

    const orderProduct = cartItems.map(
      (item) =>
        ({
          basePrice: item.product.basePrice,
          discount: item.product.discount,
          quantity: item.quantity,
          productId: item.product.id,
        }) as OrderProduct,
    );

    const userObject = await this.userService.findById(cartObject?.user.id);
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createOrderDto.status || OrderStatus.PENDING,

      address: createOrderDto.address,

      items: orderProduct,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateOrderDto.user) {
      const userObject = await this.userService.findById(updateOrderDto.user);
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status: updateOrderDto.status,

      address: updateOrderDto.address,

      items: updateOrderDto.items,

      user,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
