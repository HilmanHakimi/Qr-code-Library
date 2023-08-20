/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { query } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as _ from 'lodash';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Like } from 'typeorm';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('book') createBookDto: string,
    @Res() response: Response,
    @Query() query: any,
  ) {
    try {
      const bookPayload = JSON.parse(createBookDto)
      // console.log(bookPayload)
      const result = await this.bookService.create(bookPayload, file);
      response.status(200).send(result);
    } catch (err) {
      // console.log(err)
      response.status(500).send(err);
    }
  }

  @Get()
  async findAll(@Query() query:any) {
    return await this.bookService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne({ where : { id : id } });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body('book') updateBookDto: string,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const bookPayload = JSON.parse(updateBookDto)
      const result = await this.bookService.adminUpdateBook(id, bookPayload, file);
      response.status(200).send(result);
    } catch (err) {
      response.status(500).send(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
