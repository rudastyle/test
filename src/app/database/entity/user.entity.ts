import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userNo: number;

    @Column({length:50})
    userName: string;

    @Column({default:0})
    age: number;
}
