import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';

import { Response } from './common/reponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}
bootstrap();
