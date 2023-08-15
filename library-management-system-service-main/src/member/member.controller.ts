import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Response } from 'express';
import * as _ from 'lodash';
import { getConnection, getConnectionManager, getManager } from 'typeorm';
import { MemberBookService } from 'src/member-book/member-book.service';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly memberBookService: MemberBookService,
  ) {}

  @Post()
  async create(
    @Body() createMemberDto: CreateMemberDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this.memberService.create(createMemberDto);
      response.status(200).send(user);
    } catch (err) {
      // console.log(err);
      if (_.get(err, 'code') == 'ER_DUP_ENTRY') err = 'duplicate entry';
      response.status(500).send(err);
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() response: Response) {
    const { password } = body;
    try {
      const user = await this.memberService.validateMemberLogin(body);
      this.memberService.validatePassword(password, user);
      const result = await this.memberService.findOne({
        where: { email: user.email },
      });
      response.status(200).send(result);
    } catch (error) {
      // console.log('error', error);
      response.status(500).send(error);
    }
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id/book')
  async getBookByMemberId(@Param('id') id: any, @Query() query: any) {
    await this.memberBookService.findAndUpdateUserCompound();
    return this.memberService.getBookByMemberId(id, query);
  }

  @Get(':id/compound')
  async getCompoundByMemberId(@Param('id') id: any, @Query() query: any) {
    await this.memberBookService.findAndUpdateUserCompound();
    return this.memberService.getCompoundByMemberId(id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne({ where: { id: id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
