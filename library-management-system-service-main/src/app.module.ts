import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { MemberBookModule } from './member-book/member-book.module';
import { LibrarianModule } from './librarian/librarian.module';
import config from './common/db_config';

@Module({
  imports: [TypeOrmModule.forRoot(config), AdminModule, BookModule, MemberModule ,MemberBookModule, LibrarianModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
