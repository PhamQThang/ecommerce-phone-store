import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier',
})
export class SupplierEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  address?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  phoneNumber?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
