import { Injectable, Scope } from '@nestjs/common';
import Bool from './Bool';
import Query from './Query';

@Injectable({ scope: Scope.REQUEST })
export default class ElasticQueryBuilder {
  private _bool: Bool;
  private _query: Query;

  constructor() {
    this._query = new Query();
  }

  static create(): ElasticQueryBuilder {
    return new ElasticQueryBuilder();
  }

  public get query(): Query {
    return this._query;
  }
  public set query(value: Query) {
    this._query = value;
    // this._bool = null;
  }

  public bool(): Bool {
    if (!this._query) throw new Error('Please set Query obj first');
    if (!this._bool) {
      this._bool = new Bool();
      if (this._query._queryObject?.query)
        this._query._queryObject['query']['bool'] = this._bool.boolObj;
    }
    return this._bool;
  }
}
