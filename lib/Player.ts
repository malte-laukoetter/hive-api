import * as fetch from 'node-fetch';
import {GameType} from "./GameType";
import {Methods} from "./Methods";
import {PlayerInfo, PlayerInfoFactory} from "./PlayerInfo";

export class Player {
    private _uuid : string;
    private _name : string;
    private _info : Promise<PlayerInfo> = null;
    private _gameInfos = {};

    constructor(uuidOrName) {
        if(uuidOrName.length > 16){
            this._uuid = uuidOrName;
        }else{
            this._name = uuidOrName;

        }
    }

    get uuid() {
        return this._uuid;
    }

    get name() {
        return this._name;
    }

    info(forceRefresh : boolean = false){
        if(this._info == null || forceRefresh){
            this._info = fetch(Methods.PLAYER(this.requestUuid))
                .then(res => res.json())
                .then(res => new PlayerInfoFactory().fromResponse(res).create())
                .then(res => {
                    this._uuid = res.uuid;
                    this._name = res.name;

                    return res;
                });
        }

        return this._info;
    }

    gameInfo(gameType : GameType, forceRefresh : boolean = false){
        if(!this._gameInfos[gameType.id] || forceRefresh){
            this._gameInfos[gameType.id] = fetch(Methods.PLAYER_GAME_STATS(this.requestUuid, gameType.id))
                .then(res => res.json())
                .then((res) => new gameType.playerGameInfoFactory().fromResponse(res).create())
        }

        return this._gameInfos[gameType.id];
    }

    private get requestUuid() : string {
        return this.uuid?this.uuid:this.name;
    }
}
