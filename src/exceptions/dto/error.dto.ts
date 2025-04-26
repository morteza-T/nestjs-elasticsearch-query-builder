import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  status: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  service: string;

  @ApiProperty()
  details: any;

  @ApiProperty()
  code: string;
}
