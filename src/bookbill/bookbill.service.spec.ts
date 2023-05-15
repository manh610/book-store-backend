import { Test, TestingModule } from '@nestjs/testing';
import { BookbillService } from './bookbill.service';

describe('BookbillService', () => {
  let service: BookbillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookbillService],
    }).compile();

    service = module.get<BookbillService>(BookbillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
