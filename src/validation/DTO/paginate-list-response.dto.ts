import { ApiProperty } from '@nestjs/swagger';

export class PaginateListResponseDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
