import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CartStatus } from './carts.type';
import { Cart } from './domain/cart';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'carts',
  version: '1',
})
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Cart,
  })
  create(@Request() req) {
    console.log(req.user);
    return this.cartsService.create({
      user: {
        id: req.user.id,
      },
      status: CartStatus.IN_PROGRESS,
    });
  }

  @Get('current')
  @ApiOkResponse({
    type: Cart,
    description: 'Get current Cart',
  })
  async findCurrentCart(): Promise<Cart> {
    const listCarts = await this.cartsService.findAllWithPagination({
      paginationOptions: {
        page: 1,
        limit: 1,
      },
    });

    if (listCarts.length === 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cartId: 'cartEmpty',
        },
      });
    }
    return listCarts[0];
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Cart,
  })
  findById(@Param('id') id: string) {
    return this.cartsService.findById(id);
  }

  @Patch(':id/items')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Cart,
  })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  // @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
