import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { UpdateLibrarianDto } from './dto/update-librarian.dto';
import { response, Response } from 'express';
import * as _ from 'lodash'

@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post()
  async create(@Res() response: Response, @Body() createLibrarianDto: CreateLibrarianDto) {
    try{
      const result = await this.librarianService.create(createLibrarianDto);
      const user = await this.librarianService.findOne({  where : { id : result.raw.insertId } })
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
      const user = await this.librarianService.validateLibrarianLogin(body)
      this.librarianService.validatePassword(password, user)
      const resutl = await this.librarianService.findOne({ where : { email :  user.email } })
      response.status(200).send(resutl);
    } catch (error) {
      // console.log("error", error)
      response.status(500).send(error);
    }
  }

  @Get()
  findAll() {
    return this.librarianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librarianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibrarianDto: UpdateLibrarianDto) {
    return this.librarianService.update(+id, updateLibrarianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librarianService.remove(+id);
  }
}
