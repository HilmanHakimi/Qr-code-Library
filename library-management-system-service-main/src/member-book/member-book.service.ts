import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberBookDto } from './dto/create-member-book.dto';
import { UpdateMemberBookDto } from './dto/update-member-book.dto';
import { MemberBook } from './entities/member-book.entity';

@Injectable()
export class MemberBookService {
  constructor(
    @InjectRepository(MemberBook)
    private readonly repository: Repository<MemberBook>,
  ) {}

  create(createMemberBookDto: CreateMemberBookDto) {
    return this.repository.insert(createMemberBookDto);
  }

  findAll(query: any) {
    return this.repository.find(query);
  }

  async findAndUpdateUserCompound() {
    const sql = `
      update member_book
      SET compound_amount = DATEDIFF(CURDATE(), end_datetime)
      where end_datetime < CURDATE()
      and return_datetime is null;`;

    const result = await this.repository.query(sql);
    // console.log(result);
  }

  findOne(query:any) {
    return this.repository.findOne(query);
  }

  update(id: number, updateMemberBookDto: UpdateMemberBookDto) {
    return this.repository.update(id, updateMemberBookDto);
  }

  remove(id: any) {
    return this.repository.remove(id);
  }
}
