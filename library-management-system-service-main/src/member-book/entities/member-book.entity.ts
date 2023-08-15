import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Decimal128,
} from 'typeorm';

@Entity()
export class MemberBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: string;

  @Column()
  book_id: string;

  @Column()
  start_datetime: Date;

  @Column()
  end_datetime: Date;

  @Column({ nullable: true })
  extend_amount: string;

  @Column({ nullable: true, default: 0 })
  compound_amount: number;

  @Column({ nullable: true })
  paid_amount: string;

  @Column({ nullable: true })
  return_datetime: Date;
}
