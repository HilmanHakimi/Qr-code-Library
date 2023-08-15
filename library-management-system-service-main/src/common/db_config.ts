import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  port: 3306,
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'library_Data',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false, // set to false in production
};

export default config;