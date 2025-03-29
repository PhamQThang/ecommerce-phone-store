import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BrandEntity } from '../../../../brands/infrastructure/persistence/relational/entities/brand.entity';
import slugify from '../../../../utils/transformers/slugify';

@Injectable()
export class BrandSeedService {
  constructor(
    @InjectRepository(BrandEntity)
    private repository: Repository<BrandEntity>,
  ) {}

  async run() {
    const phoneBrands = [
      'Apple',
      'Samsung',
      'Xiaomi',
      'Oppo',
      'Vivo',
      'Realme',
      'OnePlus',
      'Google',
      'Huawei',
      'Honor',
      'Sony',
      'Nokia',
      'LG',
      'Lenovo',
      'BlackBerry',
      'HTC',
    ];

    for (const element of phoneBrands) {
      const countBrand = await this.repository.count({
        where: {
          name: element,
        },
      });
      if (!countBrand) {
        await this.repository.save(
          this.repository.create({
            name: element,
            slug: slugify(element),
          }),
        );
      }
    }
  }
}
