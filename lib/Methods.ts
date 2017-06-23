/**
 * the methods the hive api supports
 */
export class Methods {

    /**
     * the base url for all requests to the api
     */
    static BASE_URL = () => "https://api.hivemc.com/v1";

    /**
     * url for the list of gametypes
     */
    static GAMETYPE_LIST = () => `${Methods.BASE_URL()}/game`;

    /**
     * url for the information about a gametype
     * @param gameType
     */
    static GAMETYPE_INFO = (gameType) => `${Methods.BASE_URL()}/game/${gameType}`;

    /**
     * url for the latest games of the gametype
     * @param gameType
     */
    static GAMETYPE_LATEST = (gameType) => `${Methods.BASE_URL()}/game/${gameType}/data`;

    /**
     * url for the list of maps for the gametype
     * @param gameType
     */
    static MAP_LIST = (gameType) => `${Methods.BASE_URL()}/game/${gameType}/maps`;

    /**
     * url for the information about a map of the gametype
     * @param gameType
     * @param map
     */
    static MAP_INFO = (gameType, map) => `${Methods.BASE_URL()}/game/${gameType}/maps/${map}`;

    /**
     * url for information about a game
     * @param gameType the gametype of the game
     * @param gameId the id of the game
     */
    static GAME_INFO = (gameType, gameId) => `${Methods.BASE_URL()}/game/${gameType}/data/${gameId}`;

    /**
     * url for the information about a player within a game
     * @param gameType the gametype of the game
     * @param gameId the id of the game
     * @param uuid the uuid or name of the player
     */
    static GAME_INFO_PLAYER = (gameType, gameId, uuid) => `${Methods.BASE_URL()}/game/${gameType}/data/${gameId}/${uuid}`;

    /**
     * url for the leaderboard of a gametype
     * @param gameType
     * @param start
     * @param end
     */
    static GAME_LEADERBOARD = (gameType, start=0, end=20) =>
        `${Methods.BASE_URL}/game/${gameType}/leaderboard/${start}/${end}`;

    /**
     * url for information about a player
     * @param uuid the uuid or name of the player
     */
    static PLAYER = (uuid) => `${Methods.BASE_URL()}/player/${uuid}`;

    /**
     * url for information of a player for a gametype
     * @param uuid the uuid or name of the player
     * @param gameType
     */
    static PLAYER_GAME_STATS = (uuid, gameType) => `${Methods.BASE_URL()}/player/${uuid}/${gameType}`;

    /**
     * url for the current playercount of the hive
     */
    static PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/playercount`;

    /**
     * url for the unique playercount of the hive
     */
    static UNIQUE_PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/uniquecount`;

    /**
     * url for a list of the global achievements
     */
    static GLOBAL_ACHIEVEMENT_LIST = () => `${Methods.BASE_URL()}/server/achievements`;
}