import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ColorEntity } from '../../../../colors/infrastructure/persistence/relational/entities/color.entity';

@Injectable()
export class ColorSeedService {
  constructor(
    @InjectRepository(ColorEntity)
    private repository: Repository<ColorEntity>,
  ) {}

  async run() {
    const phoneColors = [
      'Đen',
      'Trắng',
      'Xám',
      'Bạc',
      'Vàng',
      'Vàng hồng',
      'Xanh dương nhạt',
      'Xanh băng',
      'Xanh lục nhạt',
      'Xanh pastel',
      'Đồng',
      'Nâu đồng',
      'Đỏ',
      'Tím',
      'Tím nhạt',
      'Tím violet',
      'Xanh lục bảo',
      'Xanh rừng',
      'Xanh navy',
      'Xanh hoàng gia',
      'Cam',
      'San hô',
      'Hồng',
      'Hồng đào',
      'Xanh lá neon',
      'Xanh chuối',
      'Chuyển màu',
      'Cực quang',
      'Holographic',
      'Phantom',
    ];

    for (const element of phoneColors) {
      const countColor = await this.repository.count({
        where: {
          name: element,
        },
      });
      if (!countColor) {
        await this.repository.save(
          this.repository.create({
            name: element,
          }),
        );
      }
    }
  }
}
