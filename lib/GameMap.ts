import { GameType, Methods, fetch } from "./main";

export class GameMap {
  constructor(
    readonly gameType: GameType,
    readonly worldName: string,
    readonly mapName: string,
    readonly author: string,
    readonly added: Date
  ) {}

  info(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<GameMapInfo> {
    return fetch(
      Methods.MAP_INFO(this.gameType.id, this.worldName),
      maxCacheAge
    ).then(
      res =>
        new GameMapInfo(
          res.popularityDay,
          res.popularityWeek,
          res.popularityMonth
        )
    );
  }
}

export class GameMapInfo {
  constructor(
    readonly popularityDay: number,
    readonly popularityWeek,
    readonly popularityMonth
  ) {}
}
