import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { Brand } from './orm/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands(
    @Query(ValidationPipe) getBrandsFilterDto: GetBrandsFilterDto,
  ): Promise<Brand[]> {
    return this.brandsService.getBrands(getBrandsFilterDto);
  }

  @Get('/:slug')
  getBrandBySlug(@Param('slug') slug: string): Promise<Brand> {
    return this.brandsService.getBrandBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBrand(
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.createBrand(createBrandDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBrand(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.brandsService.deleteBrand(id);
  }
}
