import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandRepository } from './orm/brand.repository';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BrandRepository])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
