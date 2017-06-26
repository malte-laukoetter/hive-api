import {FromResponseFactory} from "../main";

export class PlayerGameInfo {
    constructor(readonly points: number) {}
}

export class RawPlayerGameInfo extends PlayerGameInfo {
    constructor(readonly data) {
        super(0);
    }
}

export abstract class PlayerGameInfoFactory<T> implements FromResponseFactory<T> {
    protected _points: number;

    points(points: number){
        this._points = points;
        return this;
    }

    create(): T {
        return null;
    }

    fromResponse(res: any): FromResponseFactory<T> {
        return this;
    }
}

export class RawPlayerGameInfoFactory extends PlayerGameInfoFactory<RawPlayerGameInfo> {
    private _data;

    create(): RawPlayerGameInfo {
        return new RawPlayerGameInfo(this._data);
    }

    fromResponse(res: any): FromResponseFactory<RawPlayerGameInfo> {
        return this.data(res);
    }

    data(data){
        this._data = data;
        return this;
    }
}