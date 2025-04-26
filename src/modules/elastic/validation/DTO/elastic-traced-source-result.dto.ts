import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

export default class ElasticTracedSourceResult<T = unknown> {
  results: T[];
  count: number;
}
