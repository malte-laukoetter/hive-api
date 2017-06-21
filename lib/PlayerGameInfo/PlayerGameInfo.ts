import {FromResponseFactory} from "../Factory";

export class PlayerGameInfo {
    constructor() {}
}

export class PlayerGameInfoRaw extends PlayerGameInfo {
    constructor(readonly data) {
        super();
    }
}

export interface PlayerGameInfoFactory<T> extends FromResponseFactory<T> {}

export class PlayerGameInfoRawFactory implements PlayerGameInfoFactory<PlayerGameInfoRaw> {
    private _data;

    constructor() {}

    create(): PlayerGameInfoRaw {
        return new PlayerGameInfoRaw(this._data);
    }

    fromResponse(res: any): FromResponseFactory<PlayerGameInfoRaw> {
        return this.data(res);
    }

    data(data){
        this._data = data;
        return this;
    }
}