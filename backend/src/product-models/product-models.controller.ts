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
import { ProductModelsService } from './product-models.service';
import { CreateProductModelDto } from './dto/create-product-model.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductModel } from './domain/product-model';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllProductModelsDto } from './dto/find-all-product-models.dto';

@ApiTags('Productmodels')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'product-models',
  version: '1',
})
export class ProductModelsController {
  constructor(private readonly productModelsService: ProductModelsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductModel,
  })
  create(@Body() createProductModelDto: CreateProductModelDto) {
    return this.productModelsService.create(createProductModelDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductModel),
  })
  async findAll(
    @Query() query: FindAllProductModelsDto,
  ): Promise<InfinityPaginationResponseDto<ProductModel>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productModelsService.findAllWithPagination({
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
    type: ProductModel,
  })
  findById(@Param('id') id: string) {
    return this.productModelsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductModel,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductModelDto: UpdateProductModelDto,
  ) {
    return this.productModelsService.update(id, updateProductModelDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productModelsService.remove(id);
  }
}
