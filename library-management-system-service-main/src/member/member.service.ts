import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as path from 'path';
import * as qrcode from 'qrcode';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly repository: Repository<Member>,
  ) {}
  async create(createMemberDto: any) {
    await this.validateMember(createMemberDto);

    const result = await this.repository.insert(createMemberDto);
    const user = await this.findOne({
      where: { id: result.raw.insertId },
    });

    return user;
  }

  async validateMember(body: any) {
    const { email, phone_no, name, password, re_enter_password } = body;
    const err = [];

    const validateMember =
      !email || !phone_no || !name || !password || !re_enter_password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = !emailRegex.test(email);
    const phoneRegex = /^\d{10}$/;
    const validatePhoneNo = !phoneRegex.test(phone_no);
    const validatePassword = password.length < 8;
    const validatePasswordAndReEnterPassword = password !== re_enter_password;

    if (validateMember) err.push('Please provide all required fields.');
    if (validateEmail) err.push('Please provide a valid email address.');
    if (validatePhoneNo)
      err.push('Please provide a valid 10-digit phone number.');
    if (validatePassword)
      err.push('Password should be at least 8 characters long.');
    if (validatePasswordAndReEnterPassword) err.push('Passwords do not match.');

    if (!_.isEmpty(err)) throw err;
  }

  async validateMemberLogin(body) {
    const { email, password } = body;
    const err = [];

    const user = await this.repository.findOne({
      select: {
        email: true,
        password: true,
      },
      where: { email: email },
    });

    if (!email || !password) err.push('Please provide email and password.');
    if (!user) err.push('Invalid credentials.');

    if (_.isEmpty(user)) throw err;

    return user;
  }

  validatePassword(password, user) {
    const passwordMatch = password == user.password;
    // console.log(password, user.password);
    // const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw 'Invalid credentials.';
  }

  findAll() {
    return this.repository.find();
  }

  async getBookByMemberId(memberId, query) {
    let filter = '';
    if (query.hide_return) {
      filter = 'and mb.return_datetime is null';
    }

    const sql = `select *, mb.id as mb_id from member m 
    join member_book mb on m.id = mb.member_id
    join book b on mb.book_id = b.id
    where m.id = ${memberId} ${filter}`;
    const result = await this.repository.query(sql);
    return result;
  }

  async getCompoundByMemberId(memberId, query) {
    const sql = `select *, mb.id as mb_id from member m 
    join member_book mb on m.id = mb.member_id
    join book b on mb.book_id = b.id
    where m.id = ${memberId} 
    and mb.compound_amount > 0
    and mb.paid_amount is null
    and mb.return_datetime is null`;
    const result = await this.repository.query(sql);
    return result;
  }

  findOne(query: any) {
    return this.repository.findOne(query);
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.repository.update(id, updateMemberDto);
  }

  remove(id: any) {
    return this.repository.remove(id);
  }
}
