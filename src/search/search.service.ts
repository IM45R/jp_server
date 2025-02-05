import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
    private apiKey = process.env.GEO_API_KEY;

     async CitySearch(searchTerm: string): Promise<any>{
        try {

            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${this.apiKey}`;
            const response = await axios.get(url);
            return response.data;
    
        } catch (error) {
           console.error('Ошибка при поиске городов', error);
        }
        
    }
}


