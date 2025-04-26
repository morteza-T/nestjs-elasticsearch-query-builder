import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { ELASTIC_CONFIG } from '../../constants/elastic-config.constant';
import { ClientOptions } from '@elastic/elasticsearch';
import ElasticDataTransformer from '../../transformer/elastic-data.transformer';
import ElasticTracedResult from '../../validation/DTO/elastic-traced-result.dto';
import ElasticTracedSourceResult from '../../validation/DTO/elastic-traced-source-result.dto';

@Injectable()
export class ElasticSearchService {
  private readonly elasticsearchService: ElasticsearchService;
  constructor(
    @Inject(ELASTIC_CONFIG) private clientOptions: ClientOptions,
    private elasticDataTransformer: ElasticDataTransformer,
  ) {
    this.elasticsearchService = new ElasticsearchService(clientOptions);
  }

  async find<T = unknown>(
    index: string,
    query: object,
    page = 1,
    size = 50,
    sort = {},
  ): Promise<ElasticTracedResult<T>> {
    const from = (page - 1) * size;
    const response = await this.elasticsearchService.search<T>({
      index,
      query,
      from,
      size,
      sort,
    });
    return this.elasticDataTransformer.tracedData<T>(response.hits);
  }
  // _score field doesn't matter
  async findScoreless<T = unknown>(
    index: string,
    query: object,
    page = 1,
    size = 50,
    sort = {},
  ): Promise<ElasticTracedSourceResult<T>> {
    const from = (page - 1) * size;
    const response = await this.elasticsearchService.search<T>({
      index,
      query,
      from,
      size,
      sort,
    });
    return this.elasticDataTransformer.fetchSourceData<T>(response.hits);
  }
  async findAll(
    index: string,
    query: QueryDslQueryContainer,
    size = 3000,
    sort = [],
  ) {
    const response = await this.elasticsearchService.search({
      index,
      query,
      size,
      sort,
    });
    return response;
  }

  async count(index: string, query: QueryDslQueryContainer) {
    let response = await this.elasticsearchService.count({
      index,
      query,
    });
    return response.count;
  }
}
