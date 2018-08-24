import { GameType, GameTypes } from './GameType';

export enum NonGameTypeStatus {
  HUB = 'HUB',
  PREMHUB = 'PREMHUB',
  OFFLINE = 'OFFLINE'
}

export enum GameTypeMode {
  SOLO,
  DUO,
  TEAMS
}

const HUBStati = [NonGameTypeStatus.HUB, NonGameTypeStatus.PREMHUB]

export class PlayerStatus {
  status: NonGameTypeStatus | GameType
  gameTypeMode?: GameTypeMode 

  constructor(status: NonGameTypeStatus | GameType, gameTypeMode?: GameTypeMode){
    this.status = status
    this.gameTypeMode = gameTypeMode
  }

  isOnline(): boolean {
    return this.status !== NonGameTypeStatus.OFFLINE
  }

  isInHub(): boolean {
    if(this.status instanceof GameType){
      return false
    }

    return HUBStati.includes(this.status)
  }

  isInGame(): boolean {
    return ! (!NonGameTypeStatus[status])
  }

  static fromResponse(res: string): PlayerStatus{
    if(NonGameTypeStatus[res]){
      return new PlayerStatus(NonGameTypeStatus[res])
    }

    switch (res) {
      case 'BEDT':
        return new PlayerStatus(GameTypes.BED, GameTypeMode.TEAMS)
      case 'BEDD':
        return new PlayerStatus(GameTypes.BED, GameTypeMode.DUO)
      case 'BED':
        return new PlayerStatus(GameTypes.BED, GameTypeMode.SOLO)
      case 'SKYT':
        return new PlayerStatus(GameTypes.SKY, GameTypeMode.TEAMS)
      case 'SKYD':
        return new PlayerStatus(GameTypes.SKY, GameTypeMode.DUO)
      case 'SKY':
        return new PlayerStatus(GameTypes.SKY, GameTypeMode.SOLO)
    }

    let possibleGameType = GameTypes.list.find(gameType => gameType.id === res)

    if(!possibleGameType){
      throw new Error(`Unkown Player Status ${res}`)
    }

    return new PlayerStatus(possibleGameType)
  }
}
