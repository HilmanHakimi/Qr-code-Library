import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as _ from 'lodash'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly repository: Repository<Admin>
  ){
    
  }

  async create(createAdminDto: CreateAdminDto) {
    await this.validateAdmin(createAdminDto);
    return await this.repository.insert(createAdminDto);
  }

  async validateAdmin(body:any){
    const { email, phone_no, name, password, re_enter_password } = body;
    const err = [];

    const validateMember = !email || !phone_no || !name || !password || !re_enter_password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = !emailRegex.test(email)
    const phoneRegex = /^\d{10}$/;
    const validatePhoneNo = !phoneRegex.test(phone_no)
    const validatePassword = password.length < 8
    const validatePasswordAndReEnterPassword = password !== re_enter_password

    if (validateMember) err.push('Please provide all required fields.');
    if (validateEmail) err.push('Please provide a valid email address.');
    if (validatePhoneNo) err.push('Please provide a valid 10-digit phone number.');
    if (validatePassword) err.push('Password should be at least 8 characters long.');
    if (validatePasswordAndReEnterPassword) err.push('Passwords do not match.')

    if(!_.isEmpty(err)) throw err
  }

  async validateAdminLogin(body){
        const { email, password } = body
        const err = []

        const user = await this.repository.findOne({ select : { 
          email : true, 
          password:true
        }, where : { email : email } });

        if (!email || !password)  err.push('Please provide email and password.');
        if (!user) err.push('Invalid credentials.');

        if(_.isEmpty(user)) throw err

        return user
  }

  validatePassword(password, user){
    const passwordMatch = password == user.password;
    // const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw 'Invalid credentials.';
  }

  findAll() {
    return this.repository.find();
  }

  findOne(query: any) {
    return this.repository.findOne(query);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.repository.update(id, updateAdminDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
