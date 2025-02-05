import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from "typeorm";

@Entity('Notes')
export class NotesEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Content: string;

    @Column({ type: 'timestamp without time zone'})
    Date: Date;

    @BeforeInsert()
    setDate() {
      this.Date = new Date();
    }

}