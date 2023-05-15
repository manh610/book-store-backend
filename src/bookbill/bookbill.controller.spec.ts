import { Test, TestingModule } from '@nestjs/testing';
import { BookbillController } from './bookbill.controller';

describe('BookbillController', () => {
  let controller: BookbillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookbillController],
    }).compile();

    controller = module.get<BookbillController>(BookbillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
