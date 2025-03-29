import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './infrastructure/persistence/brand.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Brand } from './domain/brand';

@Injectable()
export class BrandsService {
  constructor(
    // Dependencies here
    private readonly brandRepository: BrandRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.brandRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      slug: createBrandDto.slug,

      name: createBrandDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.brandRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Brand['id']) {
    return this.brandRepository.findById(id);
  }

  findByIds(ids: Brand['id'][]) {
    return this.brandRepository.findByIds(ids);
  }

  async update(
    id: Brand['id'],

    updateBrandDto: UpdateBrandDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.brandRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      slug: updateBrandDto.slug,

      name: updateBrandDto.name,
    });
  }

  remove(id: Brand['id']) {
    return this.brandRepository.remove(id);
  }
}
