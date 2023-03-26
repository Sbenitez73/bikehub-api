import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { EnvConfig } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      synchronize: true,
      entities: [ join(__dirname, '**/**.entity{.ts,.js}') ]
    }),
    ConfigModule.forRoot({
      load: [ EnvConfig ],
      validationSchema: JoiValidationSchema
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
