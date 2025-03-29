import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Color } from '../../domain/color';

export abstract class ColorRepository {
  abstract create(
    data: Omit<Color, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Color>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Color[]>;

  abstract findById(id: Color['id']): Promise<NullableType<Color>>;

  abstract findByIds(ids: Color['id'][]): Promise<Color[]>;

  abstract update(
    id: Color['id'],
    payload: DeepPartial<Color>,
  ): Promise<Color | null>;

  abstract remove(id: Color['id']): Promise<void>;
}
