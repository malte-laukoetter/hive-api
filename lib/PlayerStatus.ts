import { GameType, GameTypes } from "./GameType";

/**
 * @deprecated
 */
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

/** @deprecated */
export class PlayerStatus {
  status: NonGameTypeStatus | /** @deprecated */ GameType;
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
    status: NonGameTypeStatus |  GameType,
    gameTypeMode?: GameTypeMode
  ) {
    this.status = status;
    this.gameTypeMode = gameTypeMode;
  }

    /**
   * @deprecated
   */
  isOnline(): boolean {
    return this.status !== NonGameTypeStatus.OFFLINE;
  }

  /**
   * @deprecated
   */
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
  static fromResponse(res: string): PlayerStatus {
    return new PlayerStatus(NonGameTypeStatus.OFFLINE)
  }
}
