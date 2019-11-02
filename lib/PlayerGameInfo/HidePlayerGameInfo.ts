import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  Achievement,
  createAchievementsFromAchievementResponse,
  PlayerGameInfoAchievements,
  PlayerGameInfoFactoryAchievements,
  createDateFromResponse
} from "../main";

export class HidePlayerGameInfo extends PlayerGameInfo
  implements PlayerGameInfoAchievements {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly gamesPlayed: number,
    readonly victories: number,
    readonly deaths: number,
    readonly hiderKills: number,
    readonly seekerKills: number,
    readonly blocks,
    readonly bookUpgrade,
    readonly rawBlockExperience,
    readonly blockExperience,
    readonly timeAlive: number,
    readonly title: string,
    readonly achievements: Achievement[]
  ) {
    super(GameTypes.HIDE, points);
  }
}

export class HidePlayerGameInfoFactory
  extends PlayerGameInfoFactory<HidePlayerGameInfo>
  implements PlayerGameInfoFactoryAchievements {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _gamesPlayed: number;
  private _victories: number;
  private _title: string;
  private _achievements: Achievement[];
  private _deaths: number;
  private _hiderKills: number;
  private _seekerKills: number;
  private _timeAlive: number;
  private _blocks;
  private _bookUpgrade;
  private _rawBlockExperience;
  private _blockExperience;

  create(): HidePlayerGameInfo {
    return new HidePlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._gamesPlayed,
      this._victories,
      this._deaths,
      this._hiderKills,
      this._seekerKills,
      this._blocks,
      this._bookUpgrade,
      this._rawBlockExperience,
      this._blockExperience,
      this._timeAlive,
      this._title,
      this._achievements
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    this.points(res.total_points)
      .firstLogin(createDateFromResponse(res.firstlogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .achievements(
        createAchievementsFromAchievementResponse(
          GameTypes.HIDE,
          res.achievements
        )
      )
      .title(res.title)
      .gamesPlayed(res.gamesplayed)
      .victories(res.victories)
      .deaths(res.deaths)
      .hiderKills(res.hiderkills)
      .seekerKills(res.seekerkills)
      .bookUpgrade(res.bookupgrade)
      .timeAlive(res.timealive)
      .rawBlockExperience(res.rawBlockExperience)
      .blockExperience(res.blockExperience);

    if (res.blocks) {
      this.blocks(res.blocks.split(",").filter(a => a != ""));
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

  achievements(achievements: Achievement[]) {
    this._achievements = achievements;
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

  hiderKills(hiderKills: number) {
    this._hiderKills = hiderKills;
    return this;
  }

  seekerKills(seekerKills: number) {
    this._seekerKills = seekerKills;
    return this;
  }

  timeAlive(timeAlive: number) {
    this._timeAlive = timeAlive;
    return this;
  }

  blocks(blocks) {
    this._blocks = blocks;
    return this;
  }

  bookUpgrade(bookUpgrade) {
    this._bookUpgrade = bookUpgrade;
    return this;
  }

  rawBlockExperience(rawBlockExperience) {
    this._rawBlockExperience = rawBlockExperience;
    return this;
  }

  blockExperience(blockExperience) {
    this._blockExperience = blockExperience;
    return this;
  }
}
