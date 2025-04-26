import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationOrder } from '../enum/pagination-order.enum';

export class PaginationDecoratorDTO {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip = 0;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page = 1;
  /** Sets the sort order. If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`. */
  // @IsEnum(PaginationOrder)
  @ApiProperty()
  sort: { [key: string]: PaginationOrder } = {};
}
