import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrency(): Promise<{ usd: number; jpy: number; btc: number}> {
      return await this.currencyService.getCurrency();
  }
}