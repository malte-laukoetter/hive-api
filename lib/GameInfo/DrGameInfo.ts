import { GameInfo, GameInfoFactory, Player } from "../main";

export enum DrTeam {
  RUNNER = "runner",
  DEATH = "death"
}

export function drTeamFromText(text: string): DrTeam {
  switch (text.toLowerCase()) {
    case "runner":
      return DrTeam.RUNNER;
    case "death":
      return DrTeam.DEATH;
  }

  throw new Error(`Unknown DrTeam ${text}`);
}

export class DrGameInfo extends GameInfo {
  constructor(
    gameEvents,
    server,
    endTime,
    startTime,
    map,
    readonly runners: Player[],
    readonly winners: Player[],
    readonly winningTeam: DrTeam,
    readonly deaths: Player[]
  ) {
    super(gameEvents, server, endTime, startTime, map);
  }
}

export class DrGameInfoFactory extends GameInfoFactory<DrGameInfo> {
  protected _runners: Player[];
  protected _winners: Player[];
  protected _winningTeam: DrTeam;
  protected _deaths: Player[];

  create(): DrGameInfo {
    return new DrGameInfo(
      this._gameEvents,
      this._server,
      this._endTime,
      this._startTime,
      this._map,
      this._runners,
      this._winners,
      this._winningTeam,
      this._deaths
    );
  }

  fromResponse(res: any): DrGameInfoFactory {
    return (super.fromResponse(res) as DrGameInfoFactory)
      .runners(res.runners.map(player => new Player(player)))
      .winners(res.winners.map(player => new Player(player)))
      .winningTeam(drTeamFromText(res.winningRole))
      .deaths(res.deaths.map(player => new Player(player)));
  }

  runners(runners: Player[]) {
    this._runners = runners;
    return this;
  }

  winners(winners: Player[]) {
    this._winners = winners;
    return this;
  }

  winningTeam(winningTeam: DrTeam) {
    this._winningTeam = winningTeam;
    return this;
  }

  deaths(deaths: Player[]) {
    this._deaths = deaths;
    return this;
  }
}
