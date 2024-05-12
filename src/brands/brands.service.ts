import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from './orm/brand.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './orm/brand.entity';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
  ) {}

  async getBrands(getBrandsFilterDto: GetBrandsFilterDto): Promise<Brand[]> {
    return this.brandRepository.getBrands(getBrandsFilterDto);
  }

  async getBrandBySlug(slug: string): Promise<Brand> {
    const found = await this.brandRepository.findOne({ where: { slug } });

    if (!found) {
      throw new NotFoundException(`Brand with slug "${slug}" does not exists`);
    }

    return found;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandRepository.createBrand(createBrandDto);
  }
}
