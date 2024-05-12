import { Test, TestingModule } from '@nestjs/testing';
import { CommonController } from './common.controller';

describe('CommonController', () => {
  let controller: CommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonController],
    }).compile();

    controller = module.get<CommonController>(CommonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sayHello', () => {
    it('should return a welcome message', () => {
      const result = controller.sayHello();
      expect(result).toEqual({ message: 'welcome!' });
    });
  });
});
