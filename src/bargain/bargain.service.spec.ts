import { Test, TestingModule } from '@nestjs/testing';
import { BargainService } from './bargain.service';

describe('BargainService', () => {
  let service: BargainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BargainService],
    }).compile();

    service = module.get<BargainService>(BargainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
