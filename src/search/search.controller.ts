import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService : SearchService){}

    @Get()
    CitySearch(@Query ('searchTerm', new ValidationPipe({transform: true})) searchTerm: string) : Promise<string>{
        return this.searchService.CitySearch(searchTerm);
    }
}
