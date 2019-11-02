import { GameInfo, GameInfoFactory, Player } from "../main";

export enum TimvTeam {
  INNOCENT = "innocent",
  TRAITOR = "traitor"
}

export function timvTeamFromText(text: string): TimvTeam {
  switch (text.toLowerCase()) {
    case "innocent":
      return TimvTeam.INNOCENT;
    case "traitor":
      return TimvTeam.TRAITOR;
  }

  throw new Error(`Unknown TimvTeam ${text}`);
}

export class TimvGameInfo extends GameInfo {
  constructor(
    gameEvents,
    server,
    endTime,
    startTime,
    map,
    readonly winningTeam: TimvTeam,
    readonly innocent: Player[],
    readonly detective: Player[],
    readonly traitor: Player[]
  ) {
    super(gameEvents, server, endTime, startTime, map);
  }
}

export class TimvGameInfoFactory extends GameInfoFactory<TimvGameInfo> {
  protected _winningTeam: TimvTeam;
  protected _innocent: Player[];
  protected _detective: Player[];
  protected _traitor: Player[];

  create(): TimvGameInfo {
    return new TimvGameInfo(
      this._gameEvents,
      this._server,
      this._endTime,
      this._startTime,
      this._map,
      this._winningTeam,
      this._innocent,
      this._detective,
      this._traitor
    );
  }

  fromResponse(res: any): TimvGameInfoFactory {
    return (super.fromResponse(res) as TimvGameInfoFactory)
      .winningTeam(timvTeamFromText(res.winner))
      .innocent(res.players.INNOCENT.map(player => new Player(player)))
      .detective(res.players.DETECTIVE.map(player => new Player(player)))
      .traitor(res.players.TRAITOR.map(player => new Player(player)));
  }

  winningTeam(winningTeam: TimvTeam) {
    this._winningTeam = winningTeam;
    return this;
  }

  innocent(innocent: Player[]) {
    this._innocent = innocent;
    return this;
  }

  detective(detective: Player[]) {
    this._detective = detective;
    return this;
  }

  traitor(traitor: Player[]) {
    this._traitor = traitor;
    return this;
  }
}
