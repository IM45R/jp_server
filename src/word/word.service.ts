// src/word/word.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WordEntity } from './word.entity'
import axios from 'axios';

@Injectable()
export class WordService {

  private apiKey = process.env.UNSPLASH_API_KEY;

  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}

  async getWord(): Promise<WordEntity | undefined> {
    try{
      const count = await this.wordRepository.count(); 
      const randomIndex = Math.floor(Math.random() * count);
      const word = await this.wordRepository.createQueryBuilder('word')
          .skip(randomIndex) // Пропускаем случайное количество записей
          .take(1) // Берем одну запись
          .getOne();
      console.log(word, 'word');
      return word;

    }catch(error){
      console.log(error, 'Ошибка при запросе слова');
    }

  }



  async getUrlPhoto(word: string): Promise<string> {

    const photo = await axios.get(`https://api.unsplash.com/search/photos?query=${word}&client_id=${this.apiKey}`);

    if (photo.data && photo.data.results && photo.data.results.length > 0){
      return photo.data.results[0].urls.full;
    } else {
      try{

          const randomPhoto = await axios.get(`https://api.unsplash.com/photos/random?client_id=${this.apiKey}`);
          
          if (randomPhoto.data && randomPhoto.data.urls){
              return randomPhoto.data.urls.regular;
          }

      } catch(err){
          console.error('Ошибка при запросе рандомной фотографии', err)
      }
    }
  }

}
