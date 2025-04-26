import BooleanQueryOptions from "./BooleanQueryOptions";

export default class Should extends BooleanQueryOptions {
    _body: Array<object> = [];

    public get shouldObj(): object {
        return this._body;
    }


}