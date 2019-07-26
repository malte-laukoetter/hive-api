import {
    GameType, GameTypes, Server, FromResponseFactory, Player, AchievementInfo, createDateFromResponse
} from "./main";
import { AchievementInfoFactory } from './AchievementInfo';

/**
 * the two types of Achievements available: Server wide achievements like the swarm and the achievements specific to a
 * game
 */
export enum AchievementTypes {
    /**
     * will resolve to a [[ServerAchievement]]
     */
    SERVER = "server",
    /**
     * will resolve to a [[GameAchievement]]
     */
    GAME = "game"
}

/**
 * base class for all achievements
 */
export abstract class Achievement {
    constructor(readonly id: string, readonly progress: number, readonly unlockedAt: Date = null){}

    /**
     * gets the general information about the achievement
     *
     * must be overwritten by the implementation
     *
     * @param maxCacheAge maximum cache age
     */
    info(maxCacheAge: number = 24*60*60*1000): Promise<AchievementInfo>{
        return null;
    };

    get unlocked(): boolean{
        return this.unlockedAt.getTime() !== 0;
    }
}

/**
 * an serverwide [[Achievement]] like the playtime achievements
 */
export class ServerAchievement extends Achievement {
    info(maxCacheAge: number = 24*60*60*1000): any {
        return Server.achievements(maxCacheAge).then(list => list.filter(achievement => achievement.id == this.id)[0]);
    }
}

/**
 * a [[Achievement]] of a certain [[GameType Game]]
 */
export class GameAchievement extends Achievement {
    constructor(id: string, progress: number, unlockedAt: Date, readonly game: GameType) {
        super(id, progress, unlockedAt);
    }

    async info(maxCacheAge: number = 24*60*60*1000): Promise<AchievementInfo> {
        const gameAchievements = await this.game.achievements(maxCacheAge)

        const possibleAchievementInfo = gameAchievements.filter(achievement => achievement.id == this.id);

        if (possibleAchievementInfo.length > 0) {
            return possibleAchievementInfo[0]
        } else {
            return new AchievementInfoFactory().id(this.id).create()
        }
    }
}

/**
 * special class for the Achievement TheSwarm as is has some special data
 */
export class TheSwarmAchievement extends ServerAchievement {
    constructor(id: string, progress: number, unlockedAt: Date, readonly theSwarmFrom: Player = null,
                readonly theSwarmGame: GameType = null) {
        super(id, progress, unlockedAt);
    }
}

/**
 * [[Factory]] to create an achievement
 */
export class AchievementFactory implements FromResponseFactory<Achievement>{
    private _id: string;
    private _progress: number;
    private _unlockedAt: Date = null;
    private _type: AchievementTypes = null;
    private _game: GameType = null;
    private _theSwarmFrom: Player = null;
    private _theSwarmGame: GameType = null;

    create(): Achievement {
        switch (this._type){
            case AchievementTypes.SERVER:
                if(this._id == "THESWARM"){
                    return new TheSwarmAchievement(this._id, this._progress, this._unlockedAt, this._theSwarmFrom,
                        this._theSwarmGame);
                }else{
                    return new ServerAchievement(this._id, this._progress, this._unlockedAt);
                }
            case AchievementTypes.GAME:
                return new GameAchievement(this._id, this._progress, this._unlockedAt, this._game);
        }

        throw new Error("a type must be set");
    }

    fromResponse(res: any): FromResponseFactory<Achievement> {
        this.progress(res.progress)
            .unlockedAt(createDateFromResponse(res.unlockedAt));

        // add the person from whom the swarm data came, ignore Initial as it's the value of the owners that had it
        // initially as they never really gained it
        if(res.from && res.from !== "Initial"){
            this.theSwarmFrom(new Player(res.from));
        }

        if(res.game){
            this.theSwarmGame(theSwarmGameToGameType(res.game));
        }

        return this;
    }

    id(id: string){
        this._id = id;
        return this;
    }

    progress(progress: number){
        this._progress = progress;
        return this;
    }

    unlockedAt(unlockedAt: Date){
        this._unlockedAt = unlockedAt;
        return this;
    }

    type(type: AchievementTypes){
        this._type = type;
        return this;
    }

    game(game: GameType){
        this._game = game;
        return this;
    }

    theSwarmFrom(theSwarmFrom: Player){
        this._theSwarmFrom = theSwarmFrom;
        return this;
    }

    theSwarmGame(theSwarmGame: GameType){
        this._theSwarmGame = theSwarmGame;
        return this;
    }
}

/**
 * the TheSwarm achievement uses some crazy gameIds so we need this to change them to out [[GameType]]s
 * @param name the value of the game field fo the TheSwarm achievement
 */
export function theSwarmGameToGameType(name: string): GameType{
    switch(name.toLowerCase()){
        case "hideandseek":
            return GameTypes.HIDE;
        case "survivalgames":
            return GameTypes.SG;
        case "deathrun":
            return GameTypes.DR;
        case "sgheroes":
            return GameTypes.HERO;
        case "theherobrine":
            return GameTypes.HB;
        case "cranked":
            return GameTypes.CR;
        case "arcade shuffle":
            return GameTypes.ARCADE_SHUFFLE;
        default:
            // test by the name and id
            let matchingTypes = GameTypes.list
                .filter((type) => type.id === name.toUpperCase() || type.name.toLowerCase() === name.toLowerCase());

            if(matchingTypes.length > 0){
                return matchingTypes[0];
            }

            console.error(`Unknown SwarmGameId: ${name}`)

            return null;
    }
}
