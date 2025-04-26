import { ClientOptions } from '@elastic/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ElasticsearchModuleAsyncOptions,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';

export const ElasticConfig: ElasticsearchModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<ClientOptions> => {
    const requestCert =
      (
        configService.get<string>('ELASTICSEARCH_REQUEST_CERT_STATUS') || ''
      ).toUpperCase() === 'TRUE';
    const username = configService.get<string>('ELASTICSEARCH_USERNAME');
    const password = configService.get<string>('ELASTICSEARCH_PASSWORD');

    return {
      nodes: configService.get<string>('ELASTICSEARCH_NODE'),
      resurrectStrategy: 'none',
      maxRetries: 10,
      requestTimeout: 59000,
      tls: {
        requestCert,
        rejectUnauthorized: false,
      },
      auth: username && password ? { username, password } : undefined,
    };
  },
  inject: [ConfigService],
};

export const gateWayElasticTestConfig: ElasticsearchModuleOptions = {
  nodes: process.env.TEST_ELASTICSEARCH_NODE?.split(',') || [],
  resurrectStrategy: 'none',
  maxRetries: 10,
  requestTimeout: 59000,
};
