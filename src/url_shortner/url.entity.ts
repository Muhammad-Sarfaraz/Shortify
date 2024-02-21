import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'url' })
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  long_url: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  short_url: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
