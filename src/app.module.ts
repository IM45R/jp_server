import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { WeatherModule } from './weather/weather.module';
import { DatabaseModule } from './database/database.module';
import { WordModule } from './word/word.module';
import { SearchModule } from './search/search.module';
import { NoteService } from './note/note.service';
import { NoteModule } from './note/note.module';


@Module({
  imports: [CurrencyModule, WeatherModule, DatabaseModule, WordModule, SearchModule, NoteModule],
})
export class AppModule {}
