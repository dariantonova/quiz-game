import { configModule } from './dynamic-config-module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/exceptions/filters/all-exceptions.filter';
import { DomainExceptionsFilter } from './core/exceptions/filters/domain-exceptions.filter';
import { HttpExceptionsFilter } from './core/exceptions/filters/http-exceptions.filter';

@Module({
  imports: [CoreModule, configModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionsFilter,
    },
  ],
})
export class AppModule {}
