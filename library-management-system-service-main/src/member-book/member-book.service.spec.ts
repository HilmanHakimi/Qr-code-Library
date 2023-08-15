import { Test, TestingModule } from '@nestjs/testing';
import { MemberBookService } from './member-book.service';

describe('MemberBookService', () => {
  let service: MemberBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberBookService],
    }).compile();

    service = module.get<MemberBookService>(MemberBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
