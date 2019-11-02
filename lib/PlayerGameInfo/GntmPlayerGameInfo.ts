import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  createDateFromResponse
} from "../main";

export class GntmPlayerGameInfo extends PlayerGameInfo {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly gamesPlayed: number,
    readonly victories: number,
    readonly deaths: number,
    readonly kills: number,
    readonly title: string,
    readonly goldEarned: number,
    readonly beastsSlain: number,
    readonly shutdowns: number
  ) {
    super(GameTypes.GNTM, points);
  }
}

export class GntmPlayerGameInfoFactory extends PlayerGameInfoFactory<
  GntmPlayerGameInfo
> {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _gamesPlayed: number;
  private _victories: number;
  private _title: string;
  private _deaths: number;
  private _kills: number;
  private _goldEarned: number;
  private _beastsSlain: number;
  private _shutdowns: number;

  create(): GntmPlayerGameInfo {
    return new GntmPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._gamesPlayed,
      this._victories,
      this._deaths,
      this._kills,
      this._title,
      this._goldEarned,
      this._beastsSlain,
      this._shutdowns
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
      .victories(res.victories)
      .kills(res.kills)
      .deaths(res.deaths)
      .goldEarned(res.gold_earned)
      .shutdowns(res.shutdowns)
      .beastsSlain(res.beasts_slain);
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

  victories(victories: number) {
    this._victories = victories;
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

  goldEarned(goldEarned: number) {
    this._goldEarned = goldEarned;
    return this;
  }

  shutdowns(shutdowns: number) {
    this._shutdowns = shutdowns;
    return this;
  }

  beastsSlain(beastsSlain: number) {
    this._beastsSlain = beastsSlain;
    return this;
  }
}
