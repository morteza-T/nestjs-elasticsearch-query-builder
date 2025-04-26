import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

export default class ElasticTracedResult<T = unknown> {
    results: SearchHit<T>[];
    count: number
}