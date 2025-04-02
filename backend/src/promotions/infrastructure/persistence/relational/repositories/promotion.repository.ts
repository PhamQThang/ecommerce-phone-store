import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Promotion } from '../../../../domain/promotion';
import { PromotionRepository } from '../../promotion.repository';
import { PromotionMapper } from '../mappers/promotion.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PromotionRelationalRepository implements PromotionRepository {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  async create(data: Promotion): Promise<Promotion> {
    const persistenceModel = PromotionMapper.toPersistence(data);
    const newEntity = await this.promotionRepository.save(
      this.promotionRepository.create(persistenceModel),
    );
    return PromotionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Promotion[]> {
    const entities = await this.promotionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PromotionMapper.toDomain(entity));
  }

  async findById(id: Promotion['id']): Promise<NullableType<Promotion>> {
    const entity = await this.promotionRepository.findOne({
      where: { id },
    });

    return entity ? PromotionMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Promotion['id'][]): Promise<Promotion[]> {
    const entities = await this.promotionRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PromotionMapper.toDomain(entity));
  }

  async update(
    id: Promotion['id'],
    payload: Partial<Promotion>,
  ): Promise<Promotion> {
    const entity = await this.promotionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.promotionRepository.save(
      this.promotionRepository.create(
        PromotionMapper.toPersistence({
          ...PromotionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PromotionMapper.toDomain(updatedEntity);
  }

  async remove(id: Promotion['id']): Promise<void> {
    await this.promotionRepository.delete(id);
  }
}
