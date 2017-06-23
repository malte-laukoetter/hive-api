import * as fetch from 'node-fetch';
import {GameType} from "./GameType";
import {Methods} from "./Methods";

export class Game {
    private _info = null;

    constructor(readonly type : GameType, readonly id : number) {}

    info(){
        if(this._info == null){
            this._info = fetch(Methods.GAME_INFO(this.type.id, this.id))
                .then(res => res.json())
                .then(res => new this.type.gameInfoFactory().fromResponse(res).create());
        }

        return this._info;
    }
}
