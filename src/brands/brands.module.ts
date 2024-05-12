import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandRepository } from './orm/brand.repository';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BrandRepository]), AuthModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
