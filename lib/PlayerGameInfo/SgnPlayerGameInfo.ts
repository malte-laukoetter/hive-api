import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  createDateFromResponse,
  Game
} from "../main";

export class SgnPlayerGameInfo extends PlayerGameInfo {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly gamesPlayed: number,
    readonly victories: number,
    readonly deaths: number,
    readonly kills: number,
    readonly mostPoints: number,
    readonly cratesOpened: number,
    readonly deathMatches: number,
    readonly recentGames: Game[]
  ) {
    super(GameTypes.SGN, points);
  }
}

export class SgnPlayerGameInfoFactory extends PlayerGameInfoFactory<
  SgnPlayerGameInfo
> {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _gamesPlayed: number;
  private _victories: number;
  private _deaths: number;
  private _kills: number;
  private _mostPoints: number;
  private _cratesOpened: number;
  private _deathMatches: number;
  private _recentGames: Game[];

  create(): SgnPlayerGameInfo {
    return new SgnPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._gamesPlayed,
      this._victories,
      this._deaths,
      this._kills,
      this._mostPoints,
      this._cratesOpened,
      this._deathMatches,
      this._recentGames
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    return this.points(res.total_points)
      .firstLogin(createDateFromResponse(res.firstLogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .gamesPlayed(res.games_played)
      .victories(res.victories)
      .kills(res.kills)
      .deaths(res.deaths)
      .mostPoints(res.most_points)
      .cratesOpened(res.crates_opened)
      .deathMatches(res.deathmatches)
      .recentGames(res.recentgames.map(a => new Game(GameTypes.SGN, a)));
  }

  firstLogin(firstLogin: Date) {
    this._firstLogin = firstLogin;
    return this;
  }

  lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
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

  mostPoints(mostPoints: number) {
    this._mostPoints = mostPoints;
    return this;
  }

  cratesOpened(cratesOpened: number) {
    this._cratesOpened = cratesOpened;
    return this;
  }

  deathMatches(deathMatches: number) {
    this._deathMatches = deathMatches;
    return this;
  }

  recentGames(recentGames: Game[]) {
    this._recentGames = recentGames;
    return this;
  }
}
