export default class Query {
  _queryObject: { query?: object } = {};

  constructor() {
    this._queryObject['query'] = {};
  }

  get body() {
    return this._queryObject.query || {};
  }

  /**
   * toString
   */
  public toString() {
    return JSON.stringify(this._queryObject, null, 2);
  }
}
