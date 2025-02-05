import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query ('city') city : string): Promise<{
    tokyo: { temp: number; description: string, icon: string };
    osaka: { temp: number; description: string, icon: string };
    moscow: {temp: number; description: string, icon: string};
    custom : {temp : number; description: string, icon: string};
  }>{
    return this.weatherService.getWeather(city);
  }
}
