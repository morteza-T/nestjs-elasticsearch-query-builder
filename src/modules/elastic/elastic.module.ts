import { DynamicModule, Module } from '@nestjs/common';
import {
  ElasticsearchModuleAsyncOptions,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';
import { ELASTIC_CONFIG } from './constants/elastic-config.constant';
import ElasticQueryBuilder from './providers/query-builder/QueryBuilder';
import { ElasticSearchService } from './providers/elastic-search/elastic-search.service';
import ElasticDataTransformer from './transformer/elastic-data.transformer';

@Module({})
export class ElasticModule {
  static registerAsync(
    options: ElasticsearchModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ElasticModule,
      imports: options.imports,
      providers: [
        {
          provide: ELASTIC_CONFIG,
          useFactory: options.useFactory || (() => ({})),
          inject: options.inject || [],
        },
        ElasticQueryBuilder,
        ElasticSearchService,
        ElasticDataTransformer,
      ],
      exports: [ElasticQueryBuilder, ElasticSearchService],
    };
  }

  static registerForTest(options: ElasticsearchModuleOptions): DynamicModule {
    return {
      module: ElasticModule,
      providers: [
        {
          provide: ELASTIC_CONFIG,
          useValue: options,
        },
        ElasticQueryBuilder,
        ElasticSearchService,
        ElasticDataTransformer,
      ],
      exports: [ElasticQueryBuilder, ElasticSearchService],
    };
  }
}
