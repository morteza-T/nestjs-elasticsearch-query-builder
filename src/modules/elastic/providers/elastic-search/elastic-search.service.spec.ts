import { Test, TestingModule } from '@nestjs/testing';
import { ElasticSearchService } from './elastic-search.service';
import { ELASTIC_CONFIG } from '../../constants/elastic-config.constant';
import ElasticDataTransformer from '../../transformer/elastic-data.transformer';
import { ConfigService } from '@nestjs/config';

describe('ElasticSearchService', () => {
  let service: ElasticSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElasticSearchService,
        ElasticDataTransformer,
        {
          provide: ELASTIC_CONFIG,
          useValue: {
            nodes: process.env.ELASTICSEARCH_NODE?.split(',') || [],
            resurrectStrategy: 'none',
            maxRetries: 10,
            requestTimeout: 59000,
          },
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<ElasticSearchService>(ElasticSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
