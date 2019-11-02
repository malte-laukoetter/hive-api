import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  Achievement,
  createAchievementsFromAchievementResponse,
  GameTypes,
  PlayerGameInfoAchievements,
  PlayerGameInfoFactoryAchievements,
  createDateFromResponse,
  arrayFromListString
} from "../main";

export enum TimvDetectiveStick {
  BLAZE_ROD = "BLAZE_ROD",
  STICK = "STICK"
}

export enum TimvFlare {
  RANDOM = "RANDOM",
  CREEPER = "CREEPER",
  DEFAULT = "DEFAULT"
}

export class TimvPlayerGameInfo extends PlayerGameInfo
  implements PlayerGameInfoAchievements {
  constructor(
    points: number,
    readonly lastLogin: Date,
    readonly mostPoints: number,
    readonly rolePoints: number,
    readonly traitorPoints: number,
    readonly innocentPoints: number,
    readonly detectivePoints: number,
    readonly activeDetectiveStick: TimvDetectiveStick,
    readonly detectiveSticks: TimvDetectiveStick[],
    readonly activeFlareUpgrade: TimvFlare,
    readonly flareUpgrades: TimvFlare[],
    readonly detectiveBook: boolean,
    readonly achievements: Achievement[],
    readonly title
  ) {
    super(GameTypes.TIMV, points);
  }
}

export class TimvPlayerGameInfoFactory
  extends PlayerGameInfoFactory<TimvPlayerGameInfo>
  implements PlayerGameInfoFactoryAchievements {
  private _lastLogin: Date;
  private _mostPoints: number;
  private _rolePoints: number;
  private _traitorPoints: number;
  private _innocentPoints: number;
  private _detectivePoints: number;
  private _activeDetectiveStick: TimvDetectiveStick;
  private _detectiveSticks: TimvDetectiveStick[] = [TimvDetectiveStick.STICK];
  private _activeFlareUpgrade: TimvFlare;
  private _flareUpgrades: TimvFlare[] = [TimvFlare.DEFAULT];
  private _detectiveBook: boolean;
  private _achievements: Achievement[];
  private _title;

  create(): TimvPlayerGameInfo {
    return new TimvPlayerGameInfo(
      this._points,
      this._lastLogin,
      this._mostPoints,
      this._rolePoints,
      this._traitorPoints,
      this._innocentPoints,
      this._detectivePoints,
      this._activeDetectiveStick,
      this._detectiveSticks,
      this._activeFlareUpgrade,
      this._flareUpgrades,
      this._detectiveBook,
      this._achievements,
      this._title
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    this.lastLogin(createDateFromResponse(res.lastlogin))
      .points(res.total_points)
      .mostPoints(res.most_points)
      .rolePoints(res.role_points)
      .traitorPoints(res.t_points)
      .innocentPoints(res.i_points)
      .detectivePoints(res.d_points)
      .activeDetectiveStick(res.active_detectivestick)
      .activeFlareUpgrade(res.active_flareupgrade)
      .detectiveBook(res.detectivebook)
      .achievements(
        createAchievementsFromAchievementResponse(
          GameTypes.TIMV,
          res.achievements
        )
      )
      .title(res.title);

    if (res.detectivesticks) {
      this.detectiveSticks(arrayFromListString(res.detectivesticks));
    }

    if (res.flareupgrade) {
      this.flareUpgrades(arrayFromListString(res.flareupgrade));
    }

    return this;
  }

  lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
    return this;
  }

  mostPoints(mostPoints: number) {
    this._mostPoints = mostPoints;
    return this;
  }

  rolePoints(rolePoints: number) {
    this._rolePoints = rolePoints;
    return this;
  }

  traitorPoints(traitorPoints: number) {
    this._traitorPoints = traitorPoints;
    return this;
  }

  innocentPoints(innocentPoints: number) {
    this._innocentPoints = innocentPoints;
    return this;
  }

  detectivePoints(detectivePoints: number) {
    this._detectivePoints = detectivePoints;
    return this;
  }

  activeDetectiveStick(activeDetectiveStick: TimvDetectiveStick) {
    this._activeDetectiveStick = activeDetectiveStick;
    return this;
  }

  detectiveSticks(detectiveSticks: TimvDetectiveStick[]) {
    if (detectiveSticks.indexOf(TimvDetectiveStick.STICK) === -1) {
      detectiveSticks.push(TimvDetectiveStick.STICK);
    }

    this._detectiveSticks = detectiveSticks;
    return this;
  }

  activeFlareUpgrade(activeFlareUpgrade: TimvFlare) {
    this._activeFlareUpgrade = activeFlareUpgrade;
    return this;
  }

  flareUpgrades(flareUpgrades: TimvFlare[]) {
    if (flareUpgrades.indexOf(TimvFlare.DEFAULT) === -1) {
      flareUpgrades.push(TimvFlare.DEFAULT);
    }

    this._flareUpgrades = flareUpgrades;
    return this;
  }

  detectiveBook(detectiveBook: boolean) {
    this._detectiveBook = detectiveBook;
    return this;
  }

  achievements(achievements: Achievement[]) {
    this._achievements = achievements;
    return this;
  }

  title(title) {
    this._title = title;
    return this;
  }
}
