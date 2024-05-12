import { Logger } from '@nestjs/common';
import { CustomRepository } from 'src/config/orm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@CustomRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  private logger = new Logger('BrandRepository');
}
