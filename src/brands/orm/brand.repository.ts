import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CustomRepository } from 'src/config/orm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { GetBrandsFilterDto } from '../dto/get-brands-filter.dto';
import { CreateBrandDto } from '../dto/create-brand.dto';
import slugify from 'slugify';

@CustomRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  private logger = new Logger('BrandRepository');

  async getBrands(getBrandsFilterDto: GetBrandsFilterDto): Promise<Brand[]> {
    const { search } = getBrandsFilterDto;
    const query = this.createQueryBuilder('brand');

    if (search) {
      query.andWhere('(brand.name LIKE :search)', {
        search: `%${search}%`,
      });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get Brands. Filters: ${JSON.stringify(getBrandsFilterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createBrand(createBrandDto: CreateBrandDto) {
    const brand = new Brand();
    const { name, slug } = createBrandDto;

    brand.name = name;
    brand.slug = slugify(slug);

    try {
      await brand.save();
      this.logger.verbose(`Created the Brand w/ name: ${brand.name}`);
      return brand;
    } catch (error) {
      if (error.code === '23505') {
        // Duplicated slug
        throw new ConflictException(`Slug ${slug} already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
