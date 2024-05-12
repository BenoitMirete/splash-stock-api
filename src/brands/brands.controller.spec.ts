import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  const mockedBrand = {
    id: '90870235-499b-432e-850a-cadd42776617',
    created: '2024-05-12T09:02:55.933Z',
    updated: '2024-05-12T09:02:55.933Z',
    name: 'AK Paint',
    slug: 'ak-paint',
  };

  const mockedBrands = [
    {
      id: '90870235-499b-432e-850a-cadd42776617',
      created: new Date('2024-05-12T09:02:55.933Z'),
      updated: new Date('2024-05-12T09:02:55.933Z'),
      name: 'AK Paint',
      slug: 'ak-paint',
    },
    {
      id: '1155a053-09f1-4414-9a78-9bc6a5518c21',
      created: new Date('2024-05-12T09:17:17.058Z'),
      updated: new Date('2024-05-12T09:17:17.058Z'),
      name: 'Vallejo Colors',
      slug: 'vallejo-colors',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            getBrands: jest.fn().mockResolvedValue(mockedBrands),
            getBrandBySlug: jest.fn().mockResolvedValue(mockedBrand),
            createBrand: jest
              .fn()
              .mockImplementation((brand: CreateBrandDto) =>
                Promise.resolve({ id: 'a uuid', ...brand }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBrands', () => {
    it('should return an array of brands', async () => {
      const filterDto: GetBrandsFilterDto = { search: '' };
      await expect(controller.getBrands(filterDto)).resolves.toEqual(
        mockedBrands,
      );
    });
  });

  describe('getBrandBySlug', () => {
    it('should return a brand by slug', async () => {
      await expect(
        controller.getBrandBySlug('a-strange-slug'),
      ).resolves.toEqual({
        id: '90870235-499b-432e-850a-cadd42776617',
        created: '2024-05-12T09:02:55.933Z',
        updated: '2024-05-12T09:02:55.933Z',
        name: 'AK Paint',
        slug: 'ak-paint',
      });
    });
  });

  describe('createBrand', () => {
    it('should create a new brand', async () => {
      const newBrandDTO: CreateBrandDto = {
        name: 'Test Brand',
        slug: 'test-brand',
      };
      await expect(controller.createBrand(newBrandDTO)).resolves.toEqual({
        id: 'a uuid',
        ...newBrandDTO,
      });
    });
  });
});
