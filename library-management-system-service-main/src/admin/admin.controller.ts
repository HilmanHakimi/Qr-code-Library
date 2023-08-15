import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as _ from 'lodash'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createMemberDto: CreateAdminDto, @Res() response: Response) {
    try{
      const result = await this.adminService.create(createMemberDto);
      // console.log(result)
      const user = await this.adminService.findOne({ where : { id : result.raw.insertId } })
      response.status(200).send(user)
    }catch(err){
      if(_.get(err, "code") == "ER_DUP_ENTRY") err = "duplicate entry"
      response.status(500).send(err)
    }
  }

  @Post("login")
  async login(@Body() body:any, @Res() response: Response){
    const { password } = body;
    try {
      const user = await this.adminService.validateAdminLogin(body)
      this.adminService.validatePassword(password, user)
      const result = await this.adminService.findOne({ where : { email : user.email } })
      response.status(200).send(result);
    } catch (error) {
      // console.log("error", error)
      response.status(500).send(error);
    }
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
