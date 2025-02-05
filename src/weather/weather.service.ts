import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private apiKey = process.env.OPENWEATHERMAP_API_KEY;
  private weatherData: {
    tokyo: { temp: number; description: string, icon: string };
    osaka: { temp: number; description: string, icon: string };
    moscow: { temp: number; description: string, icon: string };
    custom: { temp: number; description: string, icon: string, name: string };
  } = {
    tokyo: { temp: null, description: '', icon: '' },
    osaka: { temp: null, description: '', icon: '' },
    moscow: { temp: null, description: '', icon: '' },
    custom: { temp: null, description: '', icon: '', name: '' },
  };

  constructor() {}

  async getWeather(city : string): Promise<{
    tokyo: { temp: number; description: string, icon: string };
    osaka: { temp: number; description: string, icon: string };
    moscow: { temp: number; description: string, icon: string };
    custom: { temp: number; description: string, icon: string, name: string };
  }> {
    try {
      await this.updateWeatherData(city);
      return { ...this.weatherData };
    } catch (error) {
      console.error('1 Ошибка при получении данных о погоде:', error);
      throw new Error('2 Ошибка при получении данных о погоде.');
    }
  }

  private async updateWeatherData(city: string) {
    try {
      const tokyoResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${this.apiKey}&units=metric&lang=ru`
      );
      const osakaResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${this.apiKey}&units=metric&lang=ru`
      );
      const moscowResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${this.apiKey}&units=metric&lang=ru`
      );
      const customResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`
      );

      if (tokyoResponse?.data && osakaResponse?.data && moscowResponse?.data && customResponse?.data) {
        this.weatherData = {
          tokyo: {
             temp: tokyoResponse.data?.main?.temp ?? 0,
             description: tokyoResponse.data?.weather?.[0]?.description ?? 'Нет данных',
             icon: tokyoResponse.data?.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${tokyoResponse.data.weather[0].icon}@2x.png` : ''
          },
           osaka: {
             temp: osakaResponse.data?.main?.temp ?? 0,
             description: osakaResponse.data?.weather?.[0]?.description ?? 'Нет данных',
             icon: osakaResponse.data?.weather?.[0]?.icon ?  `https://openweathermap.org/img/wn/${osakaResponse.data.weather[0].icon}@2x.png` : ''
          },
          moscow: {
             temp: moscowResponse.data?.main?.temp ?? 0,
             description: moscowResponse.data?.weather?.[0]?.description ?? 'Нет данных',
              icon: moscowResponse.data?.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${moscowResponse.data.weather[0].icon}@2x.png` : ''
         },
          custom: {
              temp: customResponse.data?.main?.temp ?? 0,
              description: customResponse.data?.weather?.[0]?.description ?? 'Нет данных',
              icon: customResponse.data?.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${customResponse.data.weather[0].icon}@2x.png` : '',
              name: city
          }
        };
      } else {
        console.error(
          '3 Не удалось получить данные о погоде (структура ответа API не соответствует ожидаемой):',
          tokyoResponse?.data,
          osakaResponse?.data,
          moscowResponse?.data,
          customResponse?.data
        );
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных о погоде:', error);
      throw new Error('Ошибка при обновлении данных о погоде.');
    }
  }
}