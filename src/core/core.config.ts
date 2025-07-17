import { Injectable } from '@nestjs/common';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { configValidationUtility } from '../common/utils/config-validation.util';
import { ConfigService } from '@nestjs/config';

export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  TESTING = 'testing',
}

@Injectable()
export class CoreConfig {
  @IsEnum(Environment, {
    message:
      'Set Env variable NODE_ENV, available values: ' +
      configValidationUtility.getEnumValuesString(Environment),
  })
  env: Environment;

  @IsNumber(
    {},
    {
      message: 'Set Env variable PORT, example: 3000',
    },
  )
  port: number;

  @IsBoolean({
    message:
      'Set Env variable IS_SWAGGER_ENABLED to enable/disable dangerous for production Swagger, example: true, available values: true, false',
  })
  isSwaggerEnabled: boolean;

  private initializeConfigValues() {
    this.env = this.configService.get('NODE_ENV') as Environment;

    this.port = configValidationUtility.convertToNumber(
      this.configService.get('PORT'),
    ) as number;

    this.isSwaggerEnabled = configValidationUtility.convertToBoolean(
      this.configService.get('IS_SWAGGER_ENABLED'),
    ) as boolean;
  }

  constructor(private configService: ConfigService) {
    this.initializeConfigValues();
    configValidationUtility.validateConfig(this);
  }
}
