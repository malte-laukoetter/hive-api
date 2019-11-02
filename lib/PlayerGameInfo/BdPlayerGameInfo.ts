import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  createDateFromResponse
} from "../main";

export class BdPlayerGameInfo extends PlayerGameInfo {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly gamesPlayed: number,
    readonly deaths: number,
    readonly kills: number,
    readonly title: string,
    readonly energyCollected: number,
    readonly batteriesCharged: number
  ) {
    super(GameTypes.BD, points);
  }
}

export class BdPlayerGameInfoFactory extends PlayerGameInfoFactory<
  BdPlayerGameInfo
> {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _gamesPlayed: number;
  private _title: string;
  private _deaths: number;
  private _kills: number;
  private _energyCollected: number;
  private _batteriesCharged: number;

  create(): BdPlayerGameInfo {
    return new BdPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._gamesPlayed,
      this._deaths,
      this._kills,
      this._title,
      this._energyCollected,
      this._batteriesCharged
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    return this.points(res.total_points)
      .firstLogin(createDateFromResponse(res.firstLogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .title(res.title)
      .gamesPlayed(res.games_played)
      .kills(res.kills)
      .deaths(res.deaths)
      .energyCollected(res.energy_collected)
      .batteriesCharged(res.batteries_charged);
  }

  firstLogin(firstLogin: Date) {
    this._firstLogin = firstLogin;
    return this;
  }

  lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
    return this;
  }

  title(title: string) {
    this._title = title;
    return this;
  }

  gamesPlayed(gamesPlayed: number) {
    this._gamesPlayed = gamesPlayed;
    return this;
  }

  deaths(deaths: number) {
    this._deaths = deaths;
    return this;
  }

  kills(kills: number) {
    this._kills = kills;
    return this;
  }

  energyCollected(energyCollected: number) {
    this._energyCollected = energyCollected;
    return this;
  }

  batteriesCharged(batteriesCharged: number) {
    this._batteriesCharged = batteriesCharged;
    return this;
  }
}
