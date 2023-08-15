import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberBookDto } from './create-member-book.dto';

export class UpdateMemberBookDto extends PartialType(CreateMemberBookDto) {}
