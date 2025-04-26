import { ApiProperty } from '@nestjs/swagger';
import { PaginationOrder } from '../enum/pagination-order.enum';

export class PaginationDTO {
  @ApiProperty({
    type: 'number',
    description: 'limit per page',
    example: '10',
    default: '10',
  })
  limit: number;

  @ApiProperty({
    type: 'number',
    description: 'number of current page',
    example: '1',
    default: '1',
  })
  page: number;

  @ApiProperty({
    type: 'string',
    description: 'sort results on specific field',
    example: 'fieldName',
  })
  sort: string;
  /** Sets the sort order. If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`. */
  // @IsEnum(PaginationOrder)
  @ApiProperty({
    description:
      'Sets the sort order. If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`',
    example: 'desc',
  })
  order: PaginationOrder;
}
