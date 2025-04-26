import {
  QueryDslQueryContainer,
  SearchRequest,
} from '@elastic/elasticsearch/lib/api/types';

export class ElasticQueryBuilder {
  private _query: SearchRequest = {};
  private _must: QueryDslQueryContainer[] = [];
  private _filter: QueryDslQueryContainer[] = [];
  private _sort: string[] = [];
  private _size = -1;

  static create(): ElasticQueryBuilder {
    return new ElasticQueryBuilder();
  }

  public terms(key: string, values: string[]): ElasticQueryBuilder {
    this._must.push({
      terms: {
        [key]: values,
      },
    });
    return this;
  }

  public term(key: string, value: string): ElasticQueryBuilder {
    this._must.push({
      term: {
        [key]: value,
      },
    });
    return this;
  }

  public setIndex(index: string): ElasticQueryBuilder {
    this._query['index'] = index;
    return this;
  }

  public limit(count: number): ElasticQueryBuilder {
    this._size = count;
    return this;
  }

  public from(page: number): ElasticQueryBuilder {
    if (this._size !== -1) {
      this._query['from'] = page > 1 ? (page - 1) * this._size : 0;
    }
    return this;
  }

  public sortBy(key: string, sorted: 'asc' | 'desc'): ElasticQueryBuilder {
    this._sort.push(key, sorted);
    return this;
  }

  public source(attr: string[]): ElasticQueryBuilder {
    this._query['_source'] = [...attr];
    return this;
  }

  public build(): SearchRequest {
    return {
      ...this._query,
      size: this._size > -1 ? this._size : undefined,
      query: {
        bool: {
          must: this._must,
          filter: this._filter,
        },
      },
    };
  }
}
