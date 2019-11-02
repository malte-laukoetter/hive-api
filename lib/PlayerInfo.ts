import {
  FromResponseFactory,
  Achievement,
  AchievementFactory,
  AchievementTypes,
  createDateFromResponse,
  Rank,
  Ranks
} from "./main";
import { isNullOrUndefined } from "util";

/**
 * contains the global information about a [[Player]] like it's rank and medals
 */
export class PlayerInfo {
  constructor(
    readonly uuid: string,
    readonly name: string,
    readonly rank: Rank,
    readonly tokens: number,
    readonly medals: number,
    readonly credits: number,
    readonly crates: number,
    readonly status,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly lastLogout: Date,
    readonly achievements: Achievement[],
    readonly trophies
  ) {}
}

/**
 * factory to create a [[PlayerInfo]] instance
 */
export class PlayerInfoFactory implements FromResponseFactory<PlayerInfo> {
  private _uuid: string = "";
  private _name: string = "";
  private _rank: Rank = Ranks.REGULAR;
  private _tokens: number = 0;
  private _medals: number = 0;
  private _credits: number = 0;
  private _crates: number = 0;
  private _status;
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _lastLogout: Date;
  private _achievements: Achievement[] = [];
  private _trophies;

  create(): PlayerInfo {
    return new PlayerInfo(
      this._uuid,
      this._name,
      this._rank,
      this._tokens,
      this._medals,
      this._credits,
      this._crates,
      this._status,
      this._firstLogin,
      this._lastLogin,
      this._lastLogout,
      this._achievements,
      this._trophies
    );
  }

  fromResponse(res: any): FromResponseFactory<PlayerInfo> {
    this.name(res.username)
      .rank(Ranks.get(res.modernRank.enum))
      .tokens(res.tokens)
      .credits(res.credits)
      .medals(res.medals)
      .crates(res.crates)
      .uuid(res.UUID)
      .status(res.status)
      .firstLogin(createDateFromResponse(res.firstLogin))
      .lastLogin(createDateFromResponse(res.lastLogin))
      .lastLogout(createDateFromResponse(res.lastLogout))
      .trophies(res.trophies);

    if (!isNullOrUndefined(res.achievements)) {
      this.achievements(
        Object.entries(res.achievements)
          .filter(([id, data]) => id !== "version")
          .map(([id, data]) =>
            new AchievementFactory()
              .type(AchievementTypes.SERVER)
              .id(id)
              .fromResponse(data)
              .create()
          )
      );
    }

    return this;
  }

  uuid(uuid: string) {
    this._uuid = uuid;
    return this;
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  rank(rank: Rank) {
    this._rank = rank;
    return this;
  }

  tokens(tokens: number) {
    this._tokens = tokens;
    return this;
  }

  medals(medals: number) {
    this._medals = medals;
    return this;
  }

  credits(credits: number) {
    this._credits = credits;
    return this;
  }

  crates(crates: number) {
    this._crates = crates;
    return this;
  }

  status(status) {
    this._status = status;
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

  lastLogout(lastLogout: Date) {
    this._lastLogout = lastLogout;
    return this;
  }

  achievements(achievements: Achievement[]) {
    this._achievements = achievements;
    return this;
  }

  trophies(trophies) {
    this._trophies = trophies;
    return this;
  }
}
