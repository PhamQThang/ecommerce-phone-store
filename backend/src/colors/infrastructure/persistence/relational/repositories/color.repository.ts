import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ColorEntity } from '../entities/color.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Color } from '../../../../domain/color';
import { ColorRepository } from '../../color.repository';
import { ColorMapper } from '../mappers/color.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ColorRelationalRepository implements ColorRepository {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  async create(data: Color): Promise<Color> {
    const persistenceModel = ColorMapper.toPersistence(data);
    const newEntity = await this.colorRepository.save(
      this.colorRepository.create(persistenceModel),
    );
    return ColorMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Color[]> {
    const entities = await this.colorRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ColorMapper.toDomain(entity));
  }

  async findById(id: Color['id']): Promise<NullableType<Color>> {
    const entity = await this.colorRepository.findOne({
      where: { id },
    });

    return entity ? ColorMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Color['id'][]): Promise<Color[]> {
    const entities = await this.colorRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ColorMapper.toDomain(entity));
  }

  async update(id: Color['id'], payload: Partial<Color>): Promise<Color> {
    const entity = await this.colorRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.colorRepository.save(
      this.colorRepository.create(
        ColorMapper.toPersistence({
          ...ColorMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ColorMapper.toDomain(updatedEntity);
  }

  async remove(id: Color['id']): Promise<void> {
    await this.colorRepository.delete(id);
  }
}
