import { ApiProperty } from '@nestjs/swagger';

export class Blog {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  thumbnail?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
