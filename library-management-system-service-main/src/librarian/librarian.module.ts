import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';
import { Librarian } from './entities/librarian.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Librarian])],
  controllers: [LibrarianController],
  providers: [LibrarianService]
})
export class LibrarianModule {}
