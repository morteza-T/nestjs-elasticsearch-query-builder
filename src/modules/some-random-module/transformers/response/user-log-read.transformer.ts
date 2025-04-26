import { Injectable } from '@nestjs/common';
import { PaginationElasticDecoratorDTO } from '../../../../validation/DTO/pagination-elastic-decorator.dto';

import { UserLogListResDTO } from '../../validation/response/user-log-list.response.dto';
import { PaginatedResTransformer } from '../../../../validation/interface/paginated-response.interface';
import UserLogModel from '../../model/user-log.model';

@Injectable()
export class UserLogReadResponse
  implements
    PaginatedResTransformer<UserLogModel, PaginationElasticDecoratorDTO>
{
  transform(
    userLogModels: Array<Partial<UserLogModel>>,
    count: number,
    paginationElasticDecoratorDTO: PaginationElasticDecoratorDTO,
  ): UserLogListResDTO {
    const items = userLogModels.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      ip: log.ip,
      deviceModel:
        log.device?.model?.manufacturer + ' ' + log.device?.model?.model,
      loginStatusTitle: log.device?.status || '',
      loginStatus: log.device?.status || '',
      appVersion: this._makeAppVersion(log),
    }));

    return {
      items,
      meta: {
        itemsPerPage: paginationElasticDecoratorDTO.limit,
        currentPage: paginationElasticDecoratorDTO.page,
        itemCount: items.length,
        totalPages: Math.ceil(count / paginationElasticDecoratorDTO.limit),
        totalItems: count,
      },
    };
  }

  private _makeAppVersion(log: Partial<UserLogModel>): string {
    return (
      (log.device?.appInfo?.version.major || '?') +
      '.' +
      (log.device?.appInfo?.version.minor || '?') +
      '.' +
      (log.device?.appInfo?.version.build || '?')
    );
  }
}
