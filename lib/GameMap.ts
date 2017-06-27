import {GameType, Methods, fetch} from "./main";

export class GameMap {
    constructor(readonly gameType: GameType, readonly worldName: string, readonly mapName: string,
                readonly author: string){}

    info(forceRefresh: boolean = false): Promise<GameMapInfo>{
        return fetch(Methods.MAP_INFO(this.gameType.id, this.worldName)).then(res =>
            new GameMapInfo(res.popularityDay, res.popularityWeek, res.popularityMonth)
        )
    }
}

export class GameMapInfo {
    constructor(readonly popularityDay: number, readonly popularityWeek, readonly popularityMonth){}
}