import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:id')
  getId(@Param('id', ParseIntPipe) id: number): string {
    console.log(`$ParseIntPipe`, id);

    return this.appService.getHello();
  }
}
