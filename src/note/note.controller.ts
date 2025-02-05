import { Controller, Post, Query, Get, Body, Put, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { NotesEntity } from './note.entity';
import { DeleteResult } from 'typeorm';

@Controller()
export class NoteController {
    constructor(private noteService: NoteService){}

    @Post('notes')
    postNote(@Body() note: NotesEntity): Promise<NotesEntity>{
        return this.noteService.createNote(note);
    }

    @Get('get_notes')
    getNotes(): Promise<NotesEntity[] | undefined>{
        return this.noteService.getNotes();
    }

    @Put('edit_note')
    editNote(@Body () note : NotesEntity): Promise<NotesEntity>{
        return this.noteService.editNote(note);
    }

    @Delete('delete_note')
    async deleteNode(@Body() body: { id: number }): Promise<DeleteResult> {
        const {id} = body
        try {
            const result = await this.noteService.deleteNote(id);
            return result;
        } catch (error) {
            console.error('Ошибка на сервере:', error);
      }
    }
}
