import { Controller, Get, Query } from '@nestjs/common';
import { WordService } from './word.service';
import { WordEntity } from './word.entity';

@Controller()
export class WordController {
    constructor(private readonly wordService: WordService){}

    @Get('word')
    getWord(): Promise<WordEntity | undefined> {
        return this.wordService.getWord();
        
    }

    @Get('url')
    getUrlPhoto(@Query ('word') word : string): Promise<string>{
        return this.wordService.getUrlPhoto(word);
    }
}
