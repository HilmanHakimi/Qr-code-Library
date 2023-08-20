import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { Member } from './entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberBookModule } from 'src/member-book/member-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), MemberBookModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
