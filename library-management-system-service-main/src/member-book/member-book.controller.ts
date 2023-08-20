import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MemberBookService } from './member-book.service';
import { CreateMemberBookDto } from './dto/create-member-book.dto';
import { UpdateMemberBookDto } from './dto/update-member-book.dto';
import { BookService } from 'src/book/book.service';
import { Connection, getConnection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Controller('member-book')
export class MemberBookController {
  constructor(
    private readonly memberBookService: MemberBookService,
    private readonly bookService: BookService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    const result = await this.memberBookService.create(body);
    await this.bookService.update(body.book_id, { is_available: false });
    return result;
  }

  @Get()
  findAll() {
    return this.memberBookService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberBookService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: any,
    @Body() updateMemberBookDto: UpdateMemberBookDto,
  ) {

    const result = await this.memberBookService.update(id, updateMemberBookDto);
    const memberBook:any = await this.memberBookService.findOne({ where : { id : id } })
    if(memberBook.return_datetime) {
      this.bookService.update(memberBook.id, { is_available : true })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.memberBookService.remove(id);
  }
}
