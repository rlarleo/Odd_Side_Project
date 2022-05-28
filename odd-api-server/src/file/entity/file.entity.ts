import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('file')
export class File{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
}