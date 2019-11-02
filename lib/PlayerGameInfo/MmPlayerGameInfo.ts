import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  createDateFromResponse
} from "../main";

export class MmPlayerGameInfo extends PlayerGameInfo {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly gamesPlayed: number,
    readonly victories: number,
    readonly title: string,
    readonly correctNotes: number,
    readonly incorrectNotes: number,
    readonly perfectNotes: number,
    readonly goodNotes: number
  ) {
    super(GameTypes.MM, points);
  }
}

export class MmPlayerGameInfoFactory extends PlayerGameInfoFactory<
  MmPlayerGameInfo
> {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _gamesPlayed: number;
  private _victories: number;
  private _title: string;
  private _correctNotes: number;
  private _incorrectNotes: number;
  private _perfectNotes: number;
  private _goodNotes: number;

  create(): MmPlayerGameInfo {
    return new MmPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._gamesPlayed,
      this._victories,
      this._title,
      this._correctNotes,
      this._incorrectNotes,
      this._perfectNotes,
      this._goodNotes
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    return this.points(res.points)
      .firstLogin(createDateFromResponse(res.firstlogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .title(res.title)
      .gamesPlayed(res.gamesplayed)
      .victories(res.victories)
      .correctNotes(res.correctnotes)
      .incorrectNotes(res.incorrectnotes)
      .perfectNotes(res.notes_perfect)
      .goodNotes(res.notes_good);
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

  correctNotes(correctNotes: number) {
    this._correctNotes = correctNotes;
    return this;
  }

  incorrectNotes(incorrectNotes: number) {
    this._incorrectNotes = incorrectNotes;
    return this;
  }

  perfectNotes(perfectNotes: number) {
    this._perfectNotes = perfectNotes;
    return this;
  }

  goodNotes(goodNotes: number) {
    this._goodNotes = goodNotes;
    return this;
  }
}
