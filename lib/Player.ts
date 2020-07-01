import {
  fetch,
  GameType,
  Methods,
  PlayerInfo,
  PlayerInfoFactory,
  PlayerGameInfo,
  PlayerStatus
} from "./main";

/**
 * represents a Player that the api can interact with
 */
export class Player {
  private _uuid: string;
  private _name: string;

  /**
   * creates the player according to the given string
   * @param uuidOrName the name or uuid of the player: interpreted as name if it has less or equal to 16 characters
   *                   otherwise as uuid
   */
  constructor(uuidOrName) {
    if (uuidOrName.length > 16) {
      this._uuid = uuidOrName;
    } else {
      this._name = uuidOrName;
    }
  }

  /**
   * the uuid of the player
   * @return uuid
   */
  get uuid() {
    return this._uuid;
  }

  /**
   * the name of the player
   * @return name
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get profileUrl() {
    return `https://hivemc.com/player/${this.requestUuid}`;
  }

  fetchProfile() {
    return fetch(this.profileUrl, 60 * 60 * 1000, false);
  }

  getTwitter() {
    return this.fetchProfile()
      .then(res =>
        res.match(
          /(?:span\>\<a target=\"_blank\" href=\"\/\/twitter\.com\/)((\w){1,15})(?=\">@)/
        )
      )
      .then(res => (res ? (res[1] ? res[1] : null) : null));
  }

  /**
   * requests the [[PlayerInfo global information of the player]] if they aren't cached already
   *
   * this also updates the name an uuid to the data provided by the api
   *
   * @param maxCacheAge maximum cache age
   * @return a promise that resolves to the information
   */
  info(maxCacheAge: number = 10 * 60 * 1000): Promise<PlayerInfo> {
    return fetch(Methods.PLAYER(this.requestUuid), maxCacheAge)
      .then(res => new PlayerInfoFactory().fromResponse(res).create())
      .then(res => {
        this._uuid = res.uuid;
        this._name = res.name;

        return res;
      });
  }

  
  /**
   * @deprecated
   */
  async status(maxCacheAge: number = 1 * 60 * 1000): Promise<PlayerStatus> {
    const res = await fetch(
      Methods.PLAYER_STATUS(this.requestUuid),
      maxCacheAge
    );

    return PlayerStatus.fromResponse(res.status);
  }

  /**
   * requests information about a player in a certain [[GameType]] and returns a respective [[PlayerGameInfo]]
   *
   * currently [[PlayerGameInfo]] instances
   * * TIMV - [[TimvPlayerGameInfo]]
   *
   * every other game just uses [[RawPlayerGameInfo]] with the raw data of the response
   *
   * @param gameType the game to request the data about
   * @param maxCacheAge maximum age of the cache
   * @return a promise that resolves to the respective [[PlayerGameInfo]]
   */
  gameInfo(
    gameType: GameType,
    maxCacheAge: number = 10 * 60 * 1000
  ): Promise<PlayerGameInfo> {
    return fetch(
      Methods.PLAYER_GAME_STATS(this.requestUuid, gameType.id),
      maxCacheAge
    ).then(res => gameType.playerGameInfoFactory.fromResponse(res).create());
  }

  /**
   * returns the uuid if it sets otherwise the name
   * @return {string} uuid if existing, name otherwise
   */
  private get requestUuid(): string {
    return this.uuid ? this.uuid : this.name;
  }

  /**
   * returns the current BlockParty server the player is on
   */
  async getBPServer(): Promise<string> {
    if (!this.name) {
      await this.info();
    }

    const res = await fetch(Methods.BP_SERVER(this.name), 0);

    return res.server === "NONE" ? null : res.server;
  }
}
