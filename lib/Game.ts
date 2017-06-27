import {fetch, GameType, Methods, GameInfo} from "./main";

/**
 * a game that was played on the hive (gamelog)
 */
export class Game {
    constructor(readonly type : GameType, readonly id : number) {}

    /**
     * gets the real information about the game
     */
    info(maxCacheAge: number = 24*60*60*1000): Promise<GameInfo>{
        return fetch(Methods.GAME_INFO(this.type.id, this.id), maxCacheAge)
            .then(res => new this.type.gameInfoFactory().fromResponse(res).create());
    }
}
