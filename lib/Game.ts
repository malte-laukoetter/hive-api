import {fetch, GameType, Methods, GameInfo} from "./main";

/**
 * a game that was played on the hive (gamelog)
 */
export class Game {
    constructor(readonly type : GameType, readonly id : number) {}

    /**
     * gets the real information about the game
     */
    info(forceRefresh: boolean): Promise<GameInfo>{
        return fetch(Methods.GAME_INFO(this.type.id, this.id), forceRefresh)
            .then(res => res.json())
            .then(res => new this.type.gameInfoFactory().fromResponse(res).create());
    }
}
