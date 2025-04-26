import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDTO } from '../../../../utils/paginated-response';

export class UserLogListDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  loginStatusTitle: string;

  @ApiProperty()
  loginStatus: string;

  @ApiProperty()
  registrationDate: Date;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  ip: string;

  @ApiProperty()
  deviceModel: string;

  // @ApiProperty()
  // platformOS: string;

  // @ApiProperty()
  // platformVersion: string;

  // @ApiProperty()
  // appVersion: string;

  // @ApiProperty()
  // statusCode: number;
}

export class UserLogListResDTO extends PaginationResDTO<UserLogListDTO> {}
