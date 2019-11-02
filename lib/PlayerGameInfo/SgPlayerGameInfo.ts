import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  Achievement,
  createAchievementsFromAchievementResponse,
  Game,
  PlayerGameInfoAchievements,
  PlayerGameInfoFactoryAchievements,
  createDateFromResponse,
  arrayFromListString
} from "../main";

export enum SgArrowTrail {
  COLOURED_DUST = "COLOURED_DUST",
  HEART = "HEART",
  FLAME = "FLAME",
  SMOKE = "SMOKE",
  NOTE = "NOTE",
  VILLAGER_THUNDERCLOUD = "VILLAGER_THUNDERCLOUD"
}

export enum SgBattleCrie {
  CAT_PURREOW = "CAT_PURREOW",
  FIREWORK_LAUNCH = "FIREWORK_LAUNCH",
  LEVEL_UP = "LEVEL_UP",
  BURP = "BURP",
  DONKEY_DEATH = "DONKEY_DEATH",
  HORSE_DEATH = "HORSE_DEATH",
  VILLAGER_YES = "VILLAGER_YES",
  ANVIL_LAND = "ANVIL_LAND",
  AMBIENCE_THUNDER = "AMBIENCE_THUNDER"
}

export enum SgVanityColor {
  WHITE = 0,
  PINK = 6,
  CYAN = 9,
  ORANGE = 1,
  LIGHT_BLUE = 3,
  PURPLE = 10,
  MAGENTA = 2,
  RED = 14,
  LIME = 5
}

export class SgPlayerGameInfo extends PlayerGameInfo
  implements PlayerGameInfoAchievements {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly victories: number,
    readonly mostPoints: number,
    readonly cratesOpened: number,
    readonly deathmatches: number,
    readonly timeAlive: number,
    readonly gamesPlayed: number,
    readonly kills: number,
    readonly deaths: number,
    readonly unlockDeathcrate: boolean,
    readonly unlockMySword: boolean,
    readonly vanityColors: SgVanityColor[],
    readonly activeVanityColor: SgVanityColor,
    readonly arrowTrails: SgArrowTrail[],
    readonly battleCries: SgBattleCrie[],
    readonly activeDeathcrate: boolean,
    readonly firstWinDay: Date,
    readonly recentGames: Game[],
    readonly achievements: Achievement[]
  ) {
    super(GameTypes.SG, points);
  }
}

export class SgPlayerGameInfoFactory
  extends PlayerGameInfoFactory<SgPlayerGameInfo>
  implements PlayerGameInfoFactoryAchievements {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _victories: number;
  private _gamesPlayed: number;
  private _kills: number;
  private _deaths: number;
  private _achievements: Achievement[] = [];
  private _mostPoints: number;
  private _cratesOpened: number;
  private _deathmatches: number;
  private _timeAlive: number;
  private _unlockDeathcrate: boolean;
  private _unlockMySword: boolean;
  private _vanityColors: SgVanityColor[] = [];
  private _activeVanityColor: SgVanityColor;
  private _arrowTrails: SgArrowTrail[] = [];
  private _battleCries: SgBattleCrie[] = [];
  private _activeDeathcrate: boolean;
  private _firstWinDay: Date;
  private _recentGames: Game[];

  create(): SgPlayerGameInfo {
    return new SgPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._victories,
      this._mostPoints,
      this._cratesOpened,
      this._deathmatches,
      this._timeAlive,
      this._gamesPlayed,
      this._kills,
      this._deaths,
      this._unlockDeathcrate,
      this._unlockMySword,
      this._vanityColors,
      this._activeVanityColor,
      this._arrowTrails,
      this._battleCries,
      this._activeDeathcrate,
      this._firstWinDay,
      this._recentGames,
      this._achievements
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    this.points(res.total_points)
      .victories(res.victories)
      .gamesPlayed(res.gamesplayed)
      .kills(res.kills)
      .deaths(res.deaths)
      .firstLogin(createDateFromResponse(res.firstLogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .achievements(
        createAchievementsFromAchievementResponse(
          GameTypes.SG,
          res.achievements
        )
      )
      .cratesOpened(res.cratesopened)
      .deathmatches(res.deathmatches)
      .timeAlive(res.timealive)
      .unlockDeathcrate(res.unlock_deathcrate)
      .unlockMySword(res.unlock_mysword)
      .activeVanityColor(res.active_vanitycolor)
      .activeDeathcrate(res.active_deathcrate)
      .firstWinDay(createDateFromResponse(res.firstwinday))
      .recentGames(res.recentgames.map(game => new Game(GameTypes.SG, game)))
      .mostPoints(res.most_points);

    if (res.vanitycolors) {
      this.vanityColors(
        arrayFromListString(res.vanitycolors).map(a => parseInt(a))
      );
    }

    if (res.arrowtrails) {
      this.arrowTrails(arrayFromListString(res.arrowtrails));
    }

    if (res.battlecries) {
      this.battleCries(arrayFromListString(res.battlecries));
    }

    return this;
  }

  firstLogin(firstLogin: Date) {
    this._firstLogin = firstLogin;
    return this;
  }

  lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
    return this;
  }

  victories(victories: number) {
    this._victories = victories;
    return this;
  }

  gamesPlayed(gamesPlayed: number) {
    this._gamesPlayed = gamesPlayed;
    return this;
  }

  kills(kills: number) {
    this._kills = kills;
    return this;
  }

  deaths(deaths: number) {
    this._deaths = deaths;
    return this;
  }

  achievements(achievements: Achievement[]) {
    this._achievements = achievements;
    return this;
  }

  cratesOpened(cratesOpened: number) {
    this._cratesOpened = cratesOpened;
    return this;
  }

  deathmatches(deathmatches: number) {
    this._deathmatches = deathmatches;
    return this;
  }

  timeAlive(timeAlive: number) {
    this._timeAlive = timeAlive;
    return this;
  }

  unlockDeathcrate(unlockDeathcrate) {
    this._unlockDeathcrate = unlockDeathcrate;
    return this;
  }

  unlockMySword(unlockMySword) {
    this._unlockMySword = unlockMySword;
    return this;
  }

  vanityColors(vanityColors) {
    this._vanityColors = vanityColors;
    return this;
  }

  activeVanityColor(activeVanityColor) {
    this._activeVanityColor = activeVanityColor;
    return this;
  }

  arrowTrails(arrowTrails) {
    this._arrowTrails = arrowTrails;
    return this;
  }

  battleCries(battleCries) {
    this._battleCries = battleCries;
    return this;
  }

  activeDeathcrate(activeDeathcrate) {
    this._activeDeathcrate = activeDeathcrate;
    return this;
  }

  firstWinDay(firstWinDay: Date) {
    this._firstWinDay = firstWinDay;
    return this;
  }

  recentGames(recentGames: Game[]) {
    this._recentGames = recentGames;
    return this;
  }

  mostPoints(mostPoints: number) {
    this._mostPoints = mostPoints;
    return this;
  }
}
