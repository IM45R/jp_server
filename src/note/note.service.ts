import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from './note.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class NoteService {


    constructor(
        @InjectRepository(NotesEntity)
        private noteRepository : Repository<NotesEntity>,
    ){}

    async createNote(note : NotesEntity): Promise<NotesEntity> {
        try{
            console.log(note, 'note');
            const newNote = this.noteRepository.create(note);
            console.log(newNote, 'new');
            const result = await this.noteRepository.save(newNote)
            console.log(result, 'res');
            return result;
            } catch(error){
               console.error('ошибка при сохранении', error)
                throw error
          }
    }

    async getNotes(): Promise<NotesEntity[] |undefined>{
        try {
            const data = await this.noteRepository.find();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    async editNote(note: NotesEntity) : Promise<NotesEntity>{
        try{
            const existingNote  = await this.noteRepository.findOne({where: {id: note.id}});

            if (!existingNote) {
                throw new NotFoundException(`Заметка с id: ${note.id} не найдена`);
            }

            Object.assign(existingNote, note);

            return this.noteRepository.save(existingNote);

        }catch(error){
            console.log(error);
        }
    }

    async deleteNote(id: number) : Promise<DeleteResult>{
        try{
            const res = await this.noteRepository.delete({id});
            if(res.affected === 0){
                throw new Error(`Заметка с id: ${id} не найдена`)
             }
             return res
        }catch(error){
            console.log('error', error);
        }

    }
}
