import { NestExpressApplication } from '@nestjs/platform-express';
import { pipesSetup } from './pipes.setup';
import { globalPrefixSetup } from './global-prefix.setup';
import { CoreConfig } from '../core/core.config';
import { swaggerSetup } from './swagger.setup';
import cookieParser from 'cookie-parser';

export function appSetup(app: NestExpressApplication) {
  app.enableCors();
  app.set('trust proxy', true);
  app.use(cookieParser());

  globalPrefixSetup(app);
  pipesSetup(app);

  const coreConfig = app.get(CoreConfig);
  if (coreConfig.isSwaggerEnabled) {
    swaggerSetup(app);
  }
}
