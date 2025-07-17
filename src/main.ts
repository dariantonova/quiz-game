import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreConfig } from './core/core.config';
import { appSetup } from './setup/app.setup';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const coreConfig = app.get(CoreConfig);

  appSetup(app);

  await app.listen(coreConfig.port);
}
bootstrap();
