import { Module } from '@nestjs/common';
import { MemberBookService } from './member-book.service';
import { MemberBookController } from './member-book.controller';
import { MemberBook } from './entities/member-book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([MemberBook]), BookModule],
  controllers: [MemberBookController],
  providers: [MemberBookService],
  exports: [MemberBookService],
})
export class MemberBookModule {}
