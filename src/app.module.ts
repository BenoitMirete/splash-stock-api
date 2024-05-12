import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BrandsModule } from './brands/brands.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
