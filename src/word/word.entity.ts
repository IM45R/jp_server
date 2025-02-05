import { Entity , Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('KanjiData')
export class WordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Front: string;

  @Column()
  Back: string;

  @Column()
  Meaning: string;

  @Column()
  Tags: number;
}