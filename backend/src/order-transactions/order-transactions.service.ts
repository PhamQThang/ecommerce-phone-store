import { OrdersService } from '../orders/orders.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderTransactionDto } from './dto/create-order-transaction.dto';
import { UpdateOrderTransactionDto } from './dto/update-order-transaction.dto';
import { OrderTransactionRepository } from './infrastructure/persistence/order-transaction.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderTransaction } from './domain/order-transaction';
import { Order } from 'src/orders/domain/order';

@Injectable()
export class OrderTransactionsService {
  constructor(
    private readonly orderService: OrdersService,

    // Dependencies here
    private readonly orderTransactionRepository: OrderTransactionRepository,
  ) {}

  async create(createOrderTransactionDto: CreateOrderTransactionDto) {
    // Do not remove comment below.
    // <creating-property />
    const orderObject = await this.orderService.findById(
      createOrderTransactionDto.order.id,
    );
    if (!orderObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          order: 'notExists',
        },
      });
    }
    const order = orderObject;

    return this.orderTransactionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      order,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderTransactionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderTransaction['id']) {
    return this.orderTransactionRepository.findById(id);
  }

  findByIds(ids: OrderTransaction['id'][]) {
    return this.orderTransactionRepository.findByIds(ids);
  }

  async update(
    id: OrderTransaction['id'],

    updateOrderTransactionDto: UpdateOrderTransactionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let order: Order | undefined = undefined;

    if (updateOrderTransactionDto.order) {
      const orderObject = await this.orderService.findById(
        updateOrderTransactionDto.order.id,
      );
      if (!orderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            order: 'notExists',
          },
        });
      }
      order = orderObject;
    }

    return this.orderTransactionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      order,
    });
  }

  remove(id: OrderTransaction['id']) {
    return this.orderTransactionRepository.remove(id);
  }
}
