import { User } from '../users/domain/user';
import { UsersService } from '../users/users.service';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { VnpayService } from 'nestjs-vnpay';
import { CartStatus } from 'src/carts/carts.type';
import { ProductCode, VnpLocale, dateFormat } from 'vnpay';
import { CartsService } from '../carts/carts.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { OrderProduct } from './domain/order-product';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { OrderStatus } from './orders.type';

@Injectable()
export class OrdersService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,

    private readonly cartService: CartsService,
    private readonly vnpayService: VnpayService,
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
    if (cartObject.status !== CartStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'notInProgress',
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

    const totalAmount = orderProduct.reduce((acc, item) => {
      const finalPrice = item.basePrice - (item.discount || 0);
      return acc + finalPrice * item.quantity;
    }, 0);

    const user = userObject;
    const order = await this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createOrderDto.status ?? OrderStatus.PENDING,

      address: createOrderDto.address,

      items: orderProduct,

      user,

      totalAmount,
    });

    await this.cartService.updateCartStatus(cartObject.id, CartStatus.CHECKOUT);
    return {
      order: order,
      paymentUrl: this.createPaymentUrl(order),
    };
  }

  createPaymentUrl(order: Order) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const paymentUrl = this.vnpayService.buildPaymentUrl({
      vnp_Amount: order.totalAmount,
      vnp_IpAddr: '13.160.92.202',
      vnp_TxnRef: order.id,
      vnp_OrderInfo: `Thanh toán đơn hàng ${order.id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `${process.env.BACKEND_DOMAIN}/api/v1/order-transactions/callback`,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(tomorrow),
    });

    return paymentUrl;
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
