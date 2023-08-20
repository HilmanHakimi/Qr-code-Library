import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    phone_no: string;
  
    @Column({unique:true})
    email: string;
  
    @Column()
    password: string;

    @Column({ nullable : true})
    ic_no: string;

    @Column({ nullable : true})
    digital_id: string;
}
