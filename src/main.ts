import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreConfig } from './core/core.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const coreConfig = app.get(CoreConfig);
  await app.listen(coreConfig.port);
}
bootstrap();
