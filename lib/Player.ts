import {fetch, GameType, Methods, PlayerInfo, PlayerInfoFactory, PlayerGameInfo} from "./main";

/**
 * represents a Player that the api can interact with
 */
export class Player {
    private _uuid : string;
    private _name : string;

    /**
     * creates the player according to the given string
     * @param uuidOrName the name or uuid of the player: interpreted as name if it has less or equal to 16 characters
     *                   otherwise as uuid
     */
    constructor(uuidOrName) {
        if(uuidOrName.length > 16){
            this._uuid = uuidOrName;
        }else{
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

    /**
     * requests the [[PlayerInfo global information of the player]] if they aren't cached already
     *
     * this also updates the name an uuid to the data provided by the api
     *
     * @param forceRefresh true if the cache should be ignored
     * @return a promise that resolves to the information
     */
    info(forceRefresh : boolean = false): Promise<PlayerInfo>{
        return fetch(Methods.PLAYER(this.requestUuid), forceRefresh)
            .then(res => res.json())
            .then(res => new PlayerInfoFactory().fromResponse(res).create())
            .then(res => {
                this._uuid = res.uuid;
                this._name = res.name;

                return res;
            });
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
     * @param forceRefresh should it be requested from the api even if it is cached
     * @return a promise that resolves to the respective [[PlayerGameInfo]]
     */
    gameInfo(gameType : GameType, forceRefresh : boolean = false): Promise<PlayerGameInfo> {
        return fetch(Methods.PLAYER_GAME_STATS(this.requestUuid, gameType.id), forceRefresh)
            .then(res => res.json())
            .then((res) => new gameType.playerGameInfoFactory().fromResponse(res).create());
    }

    /**
     * returns the uuid if it sets otherwise the name
     * @return {string} uuid if existing, name otherwise
     */
    private get requestUuid() : string {
        return this.uuid?this.uuid:this.name;
    }
}
