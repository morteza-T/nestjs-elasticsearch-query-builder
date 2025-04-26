import { Injectable } from '@nestjs/common';
import { ElasticSearchService } from '../../elastic/providers/elastic-search/elastic-search.service';
import { UserLogListQueryDTO } from '../validation/user-log-list-query.dto';
import UserLogModel from '../model/user-log.model';
import { PaginationElasticDecoratorDTO } from '../../../validation/DTO/pagination-elastic-decorator.dto';
import { UserLogListSortDTO } from '../validation/user-log-list-sort.dto';
import ElasticQueryBuilder from '../../elastic/providers/query-builder/QueryBuilder';
import { PaginationOrder } from '../../../validation/enum/pagination-order.enum';
import { ConfigService } from '@nestjs/config';
import ElasticTracedSourceResult from '../../elastic/validation/DTO/elastic-traced-source-result.dto';

@Injectable()
export class UserLogService {
  private readonly elasticIndex: string;
  constructor(
    private elasticSearchService: ElasticSearchService,
    private elasticQueryBuilder: ElasticQueryBuilder,
    private configService: ConfigService<{ ELASTICSEARCH_INDEX: string }, true>,
  ) {
    this.elasticIndex = configService.get<string>('ELASTICSEARCH_INDEX');
  }

  async getList(
    searchFilterQuery: UserLogListQueryDTO,
    paginationElasticDecoratorDTO: PaginationElasticDecoratorDTO<UserLogListSortDTO>,
  ): Promise<ElasticTracedSourceResult<UserLogModel>> {
    const query = this.generateListQuery(searchFilterQuery);

    const sort = this.generateSortListQuery(paginationElasticDecoratorDTO.sort);

    return await this.elasticSearchService.findScoreless<UserLogModel>(
      this.elasticIndex,
      query,
      paginationElasticDecoratorDTO.page,
      paginationElasticDecoratorDTO.limit,
      sort,
    );
  }

  private generateListQuery(searchFilterQuery: UserLogListQueryDTO) {
    const filter = this.elasticQueryBuilder.bool().filter();

    filter.exists('device.model').match_phrase('path', '/session/login');

    if (searchFilterQuery.username)
      filter.term('user.username', searchFilterQuery.username);
    if (searchFilterQuery.customerId)
      filter.term('user.customerId', searchFilterQuery.customerId);
    if (searchFilterQuery.mobileNumber)
      filter.term(
        'user.mobileNumbers.rawValue',
        searchFilterQuery.mobileNumber,
      );
    if (searchFilterQuery.startDate) {
      filter.range('timestamp', {
        gte: new Date(searchFilterQuery.startDate),
      });
    }
    if (searchFilterQuery.endDate) {
      filter.range('timestamp', {
        lte: new Date(searchFilterQuery.endDate),
      });
    }

    const bool = this.elasticQueryBuilder.query.body;

    return bool;
  }

  private generateSortListQuery(
    sort: PaginationElasticDecoratorDTO<UserLogListSortDTO>['sort'],
  ) {
    const tracedSort: {
      timestamp?: PaginationOrder.Asc | PaginationOrder.Desc;
    } = {};

    tracedSort['timestamp'] = sort.timestamp || PaginationOrder.Desc;

    return tracedSort;
  }
}
