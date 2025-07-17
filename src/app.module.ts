import { configModule } from './dynamic-config-module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
