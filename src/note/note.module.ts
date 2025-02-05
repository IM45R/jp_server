import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesEntity } from './note.entity';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotesEntity])],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
