import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  slug: string;
}
