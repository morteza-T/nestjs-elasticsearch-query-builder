import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UserLogListQueryDTO {
  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  mobileNumber?: string;

  @ApiPropertyOptional()
  customerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
