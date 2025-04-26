import { Injectable } from '@nestjs/common';
import {
  SearchHitsMetadata,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';
import ElasticTracedResult from '../validation/DTO/elastic-traced-result.dto';
import ElasticTracedSourceResult from '../validation/DTO/elastic-traced-source-result.dto';

@Injectable()
export default class ElasticDataTransformer {
  tracedData<T = unknown>(
    searchHits: SearchHitsMetadata<T>,
  ): ElasticTracedResult<T> {
    return {
      results: searchHits.hits,
      count: (searchHits.total as SearchTotalHits)?.value
        ? (searchHits.total as SearchTotalHits).value
        : (searchHits.total as number),
    };
  }
  fetchSourceData<T>(
    searchHits: SearchHitsMetadata<T>,
  ): ElasticTracedSourceResult<T> {
    return {
      results:
        searchHits.hits?.map((searchHit) => searchHit._source as T) || [],
      count: (searchHits.total as SearchTotalHits)?.value
        ? (searchHits.total as SearchTotalHits).value
        : (searchHits.total as number),
    };
  }
}
