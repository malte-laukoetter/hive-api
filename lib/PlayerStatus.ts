import { GameType, GameTypes } from "./GameType";

export enum NonGameTypeStatus {
  HUB = "HUB",
  PREMHUB = "PREMHUB",
  OFFLINE = "OFFLINE"
}

/**
 * @deprecated
 */
export enum GameTypeMode {
  SOLO,
  DUO,
  TEAMS
}

const HUBStati = [NonGameTypeStatus.HUB, NonGameTypeStatus.PREMHUB];

type RawPlayerStatus = {description: string, game: string};

export class PlayerStatus {
  status: NonGameTypeStatus | /** @deprecated */ GameType;
  raw?: RawPlayerStatus;
  /**
   * @deprecated
   */
  gameTypeMode?: GameTypeMode;

  /** @deprecated */
  constructor(
    status: NonGameTypeStatus |  GameType,
    gameTypeMode?: GameTypeMode
  )
  constructor(
    status: NonGameTypeStatus,
    raw?: RawPlayerStatus
  )
  constructor(
    status: NonGameTypeStatus |  GameType,
    raw?: GameTypeMode | RawPlayerStatus
  ) {
    this.status = status;
    if (typeof raw === "object") {
      this.raw = raw;
    }
    //this.gameTypeMode = gameTypeMode;
  }

  isOnline(): boolean {
    return this.status !== NonGameTypeStatus.OFFLINE;
  }

  isInHub(): boolean {
    if (this.status instanceof GameType) {
      return false;
    }

    return HUBStati.includes(this.status);
  }

  /**
   * @deprecated
   */
  isInGame(): boolean {
    return false;
  }

  /**
   * @deprecated
   */
  static fromResponse(res: string): PlayerStatus
  static fromResponse(res: RawPlayerStatus): PlayerStatus
  static fromResponse(res: string | RawPlayerStatus): PlayerStatus {
    if (typeof res === 'string') {
      console.warn("Raw player status handling is deprecated")
      return new PlayerStatus(NonGameTypeStatus.OFFLINE)
    }

    if (res.description === "Currently hibernating in" && res.game === "the Land of Nods!") {
      return new PlayerStatus(NonGameTypeStatus.OFFLINE, res);
    }

    console.warn("Unknown PlayerStatus: ", res);

    return new PlayerStatus(NonGameTypeStatus.OFFLINE, res);
  }
}
