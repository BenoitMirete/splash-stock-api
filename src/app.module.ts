import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BrandsModule } from './brands/brands.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './config/orm/typeorm-ex.module';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmExModule.forCustomRepository([]),
    CommonModule,
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
