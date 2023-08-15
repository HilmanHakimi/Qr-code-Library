import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Librarian {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    phone_no: string;
  
    @Column({unique:true})
    email: string;
  
    @Column()
    ic_no: string;
  
    @Column()
    password: string;
}
