/* eslint-disable prettier/prettier */
import { MemberBook } from 'src/member-book/entities/member-book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  is_available: string;

  @Column({ nullable: true })
  url: string;
  
  @Column({ nullable: true, type : "longtext" })
  image: string;

  @Column({ nullable: true })
  location_floor: string;

  @Column({ nullable: true })
  location_shelf: string;

  @Column({ nullable: true })
  location_row: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  edition: string;
}
