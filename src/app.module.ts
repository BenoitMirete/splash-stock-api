import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [CommonModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
