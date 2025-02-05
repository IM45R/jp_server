import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}
