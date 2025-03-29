import { Color } from '../../../../domain/color';

import { ColorEntity } from '../entities/color.entity';

export class ColorMapper {
  static toDomain(raw: ColorEntity): Color {
    const domainEntity = new Color();
    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Color): ColorEntity {
    const persistenceEntity = new ColorEntity();
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
