import {FromResponseFactory} from "../main";

export class PlayerGameInfo {
    constructor() {}
}

export class RawPlayerGameInfo extends PlayerGameInfo {
    constructor(readonly data) {
        super();
    }
}

export interface PlayerGameInfoFactory<T> extends FromResponseFactory<T> {}

export class RawPlayerGameInfoFactory implements PlayerGameInfoFactory<RawPlayerGameInfo> {
    private _data;

    constructor() {}

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