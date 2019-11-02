import { GameInfo, GameInfoFactory, Player } from "../main";

export class SingleWinnerGameInfo extends GameInfo {
  constructor(
    gameEvents,
    server,
    endTime,
    startTime,
    map,
    readonly players: Player[],
    readonly winner: Player
  ) {
    super(gameEvents, server, endTime, startTime, map);
  }
}

export abstract class SingleWinnerGameInfoFactory<
  T extends SingleWinnerGameInfo
> extends GameInfoFactory<T> {
  protected _players: Player[];
  protected _winner: Player;

  abstract create(): T;

  fromResponse(res: any): SingleWinnerGameInfoFactory<T> {
    return (super.fromResponse(res) as SingleWinnerGameInfoFactory<T>)
      .players(res.players.map(player => new Player(player)))
      .winner(new Player(res.winner));
  }

  players(players: Player[]) {
    this._players = players;
    return this;
  }

  winner(winner: Player) {
    this._winner = winner;
    return this;
  }
}
