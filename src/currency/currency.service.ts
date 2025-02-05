
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  
  private apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  private currencyData: { usd: number; jpy: number; btc: number } = { usd: 0, jpy: 0, btc: 0 };

   constructor() {}

  async getCurrency(): Promise<{ usd: number; jpy: number; btc: number }> {
    try {
      await this.updateCurrencyData();
      console.log('Валюта успешно');
      return { ...this.currencyData }; // Возвращаем копию данных
    } catch (error) {
       console.error('Ошибка при получении курса валют: (в конце)', error);
      //throw new Error('Ошибка при получении курса валют.');
    }
  }

  private async updateCurrencyData() {
      try {
        console.log('Берем валюту');
        const response = await axios.get(
          `https://openexchangerates.org/api/latest.json?app_id=${this.apiKey}&symbols=USD,JPY,RUB,BTC`
        );
        console.log('Взяли Валюту успешно');
        if (response.data && response.data.rates) {
          const usdToRub = response.data.rates.RUB; // курс USD к RUB
          const jpyToUsd = response.data.rates.JPY; // курс JPY к USD
          const btc = response.data.rates.BTC;
          this.currencyData = {
              usd: usdToRub ? parseFloat((usdToRub).toFixed(2)) : 0, // Курс USD к RUB (рублей за 1 доллар)
              jpy: usdToRub && jpyToUsd ?  parseFloat((usdToRub / jpyToUsd).toFixed(2)) : 0, // Курс JPY к RUB (рублей за 1 йену)
              btc: btc ? parseFloat((btc*10000000000).toFixed(0)) : 0,
          };
         } else {
           console.error(
            'Не удалось получить данные о курсах (структура ответа API не соответствует ожидаемой):',
            response.data
            );
        }
      } catch (error) {
         console.error('Ошибка при обновлении курса валют:', error);
         //throw new Error('Ошибка при обновлении курса валют.');
    }
  }
}