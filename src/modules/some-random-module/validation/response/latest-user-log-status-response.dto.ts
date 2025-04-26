import { ApiProperty } from '@nestjs/swagger';

export class LatestUserLogStatusResponseDto {
  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  loginStatus: string;

  @ApiProperty()
  loginStatusTitle: string;
}
