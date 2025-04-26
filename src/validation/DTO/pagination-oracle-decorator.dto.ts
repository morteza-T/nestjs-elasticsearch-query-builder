import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationOrder } from '../enum/pagination-order.enum';

export class PaginationOracleDecoratorDTO {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take: number;

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
  /** "ASC" | "DESC" | "asc" | "desc" | 1 | -1 | {
    direction?: "asc" | "desc" | "ASC" | "DESC";
    nulls?: "first" | "last" | "FIRST" | "LAST";}; */
  // @IsEnum(PaginationOrder)
  @ApiProperty()
  order: { [key: string]: PaginationOrder } = {};
}
