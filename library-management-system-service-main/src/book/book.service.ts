import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import * as _ from 'lodash';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly repository: Repository<Book>,
  ) {}

  create(createBookDto: any, image: any) {
      const uploaded = image?.buffer
      const converted = uploaded?.toString('base64')
      const payload = {
        ...createBookDto,
        url: image ? image.originalname : '',
        image: image ? converted : '',
      }

    return this.repository.insert(payload);
  }

  async findAll(query:any) {
    if(query.title){
      
      const books:any = await this.repository.createQueryBuilder("book")
      .where('book.title LIKE :title OR book.genre LIKE :genre', {
        title: `%${query.title}%`,
        genre: `%${query.title}%`,
      }).getMany();

      return books.map(book => ({
        ...book
      }));

    }

    return this.repository.find()
}

  findOne(query: any) {
    return this.repository.findOne(query);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.repository.update(id, updateBookDto);
  }

  async adminUpdateBook(id: string, updateBookDto: any, image: any) {
    const uploaded = image?.buffer
    const converted = uploaded?.toString('base64')
    const payload = {
      ...updateBookDto,
      url: image ? image.originalname : '',
      image: image ? converted : '',
    }

    return this.repository.update(id, payload);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
