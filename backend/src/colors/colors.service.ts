import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ColorRepository } from './infrastructure/persistence/color.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Color } from './domain/color';

@Injectable()
export class ColorsService {
  constructor(
    // Dependencies here
    private readonly colorRepository: ColorRepository,
  ) {}

  async create(createColorDto: CreateColorDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.colorRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createColorDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.colorRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Color['id']) {
    return this.colorRepository.findById(id);
  }

  findByIds(ids: Color['id'][]) {
    return this.colorRepository.findByIds(ids);
  }

  async update(
    id: Color['id'],

    updateColorDto: UpdateColorDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.colorRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateColorDto.name,
    });
  }

  remove(id: Color['id']) {
    return this.colorRepository.remove(id);
  }
}
