import { Test, TestingModule } from '@nestjs/testing';
import { MemberBookController } from './member-book.controller';
import { MemberBookService } from './member-book.service';

describe('MemberBookController', () => {
  let controller: MemberBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberBookController],
      providers: [MemberBookService],
    }).compile();

    controller = module.get<MemberBookController>(MemberBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
