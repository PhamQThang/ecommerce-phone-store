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

@Injectable()
export class OrdersService {
  constructor(
    private readonly productService: ProductsService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,

    private readonly cartService: CartsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
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

    const itemsObjects = cartObject?.products || [];
    if (itemsObjects.length === 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          items: 'itemsMustNotBeEmpty',
        },
      });
    }
    const items = itemsObjects;

    const userObject = await this.userService.findById(cartObject?.userId.id);
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
      items,

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
    let items: Product[] | undefined = undefined;

    if (updateOrderDto.items) {
      const itemsObjects = await this.productService.findByIds(
        updateOrderDto.items.map((entity) => entity.id),
      );
      if (itemsObjects.length !== updateOrderDto.items.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            items: 'notExists',
          },
        });
      }
      items = itemsObjects;
    }

    let user: User | undefined = undefined;

    if (updateOrderDto.userId) {
      const userObject = await this.userService.findById(updateOrderDto.userId);
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
      items,

      user,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
