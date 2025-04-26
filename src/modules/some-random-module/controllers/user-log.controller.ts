import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ErrorDto } from '../../../exceptions/dto/error.dto';
import { UserLogService } from '../services/user-log.service';
import { PaginationResDTO } from '../../../utils/paginated-response';
import { UserLogListQueryDTO } from '../validation/user-log-list-query.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import UserLogModel from '../model/user-log.model';
import { UserLogReadResponse } from '../transformers/response/user-log-read.transformer';
import { PaginationElasticDecoratorDTO } from '../../../validation/DTO/pagination-elastic-decorator.dto';
import { PaginationElasticQuery } from '../../../decorator/pagination-elastic.decorator';

@ApiTags('user-log')
@Controller('api/v1/user-log')
@ApiBearerAuth()
export class UserLogController {
  constructor(
    private readonly userLogModelService: UserLogService,
    private readonly userLogModelReadResponse: UserLogReadResponse,
  ) {}

  @ApiOperation({
    summary: 'Search Profile Lists',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: PaginationResDTO,
  })
  @ApiResponse({
    description: 'ERROR response structure',
    type: ErrorDto,
  })
  @Get()
  async search(
    @Query() searchFilterQuery: UserLogListQueryDTO,
    @PaginationElasticQuery()
    paginationElasticDecoratorDTO: PaginationElasticDecoratorDTO,
  ): Promise<PaginationResDTO<UserLogModel>> {
    const response = await this.userLogModelService.getList(
      searchFilterQuery,
      paginationElasticDecoratorDTO,
    );
    return this.userLogModelReadResponse.transform(
      response.results,
      response.count,
      paginationElasticDecoratorDTO,
    );
  }
}
