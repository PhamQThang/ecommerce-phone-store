import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductIdentitiesService } from './product-identities.service';
import { CreateProductIdentityDto } from './dto/create-product-identity.dto';
import { UpdateProductIdentityDto } from './dto/update-product-identity.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductIdentity } from './domain/product-identity';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllProductIdentitiesDto } from './dto/find-all-product-identities.dto';

@ApiTags('Productidentities')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'product-identities',
  version: '1',
})
export class ProductIdentitiesController {
  constructor(
    private readonly productIdentitiesService: ProductIdentitiesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductIdentity,
  })
  create(@Body() createProductIdentityDto: CreateProductIdentityDto) {
    return this.productIdentitiesService.create(createProductIdentityDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductIdentity),
  })
  async findAll(
    @Query() query: FindAllProductIdentitiesDto,
  ): Promise<InfinityPaginationResponseDto<ProductIdentity>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productIdentitiesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductIdentity,
  })
  findById(@Param('id') id: string) {
    return this.productIdentitiesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductIdentity,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductIdentityDto: UpdateProductIdentityDto,
  ) {
    return this.productIdentitiesService.update(id, updateProductIdentityDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productIdentitiesService.remove(id);
  }
}
