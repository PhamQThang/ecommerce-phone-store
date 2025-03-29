import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Brand } from '../../../../domain/brand';
import { BrandRepository } from '../../brand.repository';
import { BrandMapper } from '../mappers/brand.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BrandRelationalRepository implements BrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(data: Brand): Promise<Brand> {
    const persistenceModel = BrandMapper.toPersistence(data);
    const newEntity = await this.brandRepository.save(
      this.brandRepository.create(persistenceModel),
    );
    return BrandMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Brand[]> {
    const entities = await this.brandRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => BrandMapper.toDomain(entity));
  }

  async findById(id: Brand['id']): Promise<NullableType<Brand>> {
    const entity = await this.brandRepository.findOne({
      where: { id },
    });

    return entity ? BrandMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Brand['id'][]): Promise<Brand[]> {
    const entities = await this.brandRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => BrandMapper.toDomain(entity));
  }

  async update(id: Brand['id'], payload: Partial<Brand>): Promise<Brand> {
    const entity = await this.brandRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.brandRepository.save(
      this.brandRepository.create(
        BrandMapper.toPersistence({
          ...BrandMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return BrandMapper.toDomain(updatedEntity);
  }

  async remove(id: Brand['id']): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
