import Bool from '../Bool';
import LeafQuery from './LeafQuery.interface';
import { RangeConditionKeyInterface } from './interfaces/range-condition-key.interface';

export default abstract class BooleanQueryOptions implements LeafQuery {
  abstract _body: Array<object>;

  // nested bool
  public bool(): Bool {
    let bool = new Bool();
    this._body.push({
      bool: bool.boolObj,
    });
    return bool;
  }

  term(key: string | number, value: unknown) {
    this._body.push({ term: { [key]: value } });
    return this;
  }
  terms(key: string | number, values: unknown[]) {
    this._body.push({ terms: { [key]: values } });
    return this;
  }

  match(key: string | number, value: unknown) {
    this._body.push({ match: { [key]: value } });
    return this;
  }
  match_phrase(key: string | number, value: unknown) {
    this._body.push({ match_phrase: { [key]: value } });
    return this;
  }
  exists(key: string) {
    this._body.push({ exists: { field: key } });
    return this;
  }

  range(key: string, condition: RangeConditionKeyInterface) {
    this._body.push({
      range: {
        [key]: {
          ...condition,
        },
      },
    });
    return this;
  }
}
