import BooleanQueryOptions from "./BooleanQueryOptions";

export default class Filter extends BooleanQueryOptions {
    _body: Array<object> = [];

    public get body(): object {
        return this._body;
    }






}