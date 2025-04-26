import { RangeConditionKeyInterface } from './interfaces/range-condition-key.interface';

export default interface LeafQuery {
  term(key: string | number, value: unknown): this;
  terms(key: string | number, values: unknown[]): this;
  match(key: string | number, value: unknown): this;
  match_phrase(key: string | number, value: unknown): this;
  exists(key: string): this;
  range(key: string, condition: RangeConditionKeyInterface);
}
