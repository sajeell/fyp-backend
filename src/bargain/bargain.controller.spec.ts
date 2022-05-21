import { Test, TestingModule } from '@nestjs/testing';
import { BargainController } from './bargain.controller';

describe('BargainController', () => {
  let controller: BargainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BargainController],
    }).compile();

    controller = module.get<BargainController>(BargainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
