export class Methods {
    static BASE_URL = () => "https://api.hivemc.com/v1";
    static GAMETYPE_LIST = () => `${Methods.BASE_URL()}/game`;
    static GAMETYPE_INFO = (gameType) => `${Methods.BASE_URL()}/game/${gameType}`;
    static GAMETYPE_LATEST = (gameType) => `${Methods.BASE_URL()}/game/${gameType}/data`;
    static MAP_LIST = (gameType) => `${Methods.BASE_URL()}/game/${gameType}/maps`;
    static MAP_INFO = (gameType, map) => `${Methods.BASE_URL()}/game/${gameType}/maps/${map}`;
    static GAME_INFO = (gameType, gameId) => `${Methods.BASE_URL()}/game/${gameType}/data/${gameId}`;
    static GAME_INFO_PLAYER = (gameType, gameId, uuid) => `${Methods.BASE_URL()}/game/${gameType}/data/${gameId}/${uuid}`;
    static GAME_LEADERBOARD = (gameType, start=0, end=20) =>
        `${Methods.BASE_URL}/game/${gameType}/leaderboard/${start}/${end}`;
    static PLAYER = (uuid) => `${Methods.BASE_URL()}/player/${uuid}`;
    static PLAYER_GAME_STATS = (uuid, gameType) => `${Methods.BASE_URL()}/player/${uuid}/${gameType}`;
    static PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/playercount`;
    static UNIQUE_PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/uniquecount`;
    static GLOBAL_ACHIEVEMENT_LIST = () => `${Methods.BASE_URL()}/server/achivements`;
}