import Filter from "./BooleanQueries/FIlter";
import Must from "./BooleanQueries/Must";
import Should from "./BooleanQueries/Should";

export default class Bool {
    private _boolObj: object = {};
    private _should: Should;
    private _must: Must;
    private _filter: Filter;

    public get boolObj(): object {
        return this._boolObj;
    }
    public set boolObj(value: object) {
        this._boolObj = value;
    }

    should(): Should {
        if (!this._should) {
            this._should = new Should();
            this._boolObj["should"] = this._should._body
        }
        return this._should;
    }

    // shouldMatch(key: string, value: any): Should {
    //     if (!this._should) {
    //         this._should = new Should();
    //         this._boolObj["should"] = this._should._body
    //     }
    //     this._should.match(key, value);
    //     return this._should;
    // }

    must(): Must {
        if (!this._must) {
            this._must = new Must();
            this._boolObj["must"] = this._must._body;
        }
        return this._must;
    }
    // mustMatch(key: string, value: any): Must {
    //     if (!this._must) {
    //         this._must = new Must();
    //         this._boolObj["must"] = this._must._body;
    //     }
    //     this._must.match(key, value);
    //     return this._must;
    // }


    filter(): Filter {
        if (!this._filter) {
            this._filter = new Filter();
            this._boolObj["filter"] = this._filter._body;
        }
        return this._filter;
    }

    // filterTerm(key: string | number, value: unknown): Filter {
    //     if (!this._filter) {
    //         this._filter = new Filter();
    //         this._boolObj["filter"] = this._filter._body;
    //     }
    //     this._filter.term(key, value);
    //     return this._filter;
    // }

    // filterTerms(key: string | number, value: unknown[]): Filter {
    //     if (!this._filter) {
    //         this._filter = new Filter();
    //         this._boolObj["filter"] = this._filter._body;
    //     }
    //     this._filter.terms(key, value);
    //     return this._filter;
    // }

    /**
     * toString
     */
    public toString() {
        return this._boolObj;
    }
}