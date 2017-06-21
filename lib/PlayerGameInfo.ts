import {FromResponseFactory} from "./Factory";
export class PlayerGameInfo {
    constructor() {}
}

export class PlayerGameInfoFactory implements FromResponseFactory<PlayerGameInfo> {
    constructor() {}

    create(): PlayerGameInfo {
        return new PlayerGameInfo();
    }

    fromResponse(res: any): FromResponseFactory<PlayerGameInfo> {
        return this;
    }
}

