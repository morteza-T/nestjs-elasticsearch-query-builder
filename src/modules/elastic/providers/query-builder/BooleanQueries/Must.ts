import BooleanQueryOptions from "./BooleanQueryOptions";

export default class Must extends BooleanQueryOptions {
    _body: Array<object> = [];

    public get mustObj(): object {
        return this._body;
    }


}