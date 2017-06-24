import {GameType, GameTypes} from "./GameType";
import {Server} from "./Server";
import {FromResponseFactory} from "./Factory";
import {Player} from "./Player";
import {AchievementInfo} from "./AchievementInfo";

/**
 * the two types of Achievements available: Server wide achievements like the swarm and the achievements specific to a
 * game
 */
export enum AchievementTypes {
    /**
     * will resolve to a [[ServerAchievement]]
     */
    SERVER,
    /**
     * will resolve to a [[GameAchievement]]
     */
    GAME
}

/**
 * base class for all achievements
 */
export abstract class Achievement {
    constructor(readonly id: string, readonly progress: number, readonly unlockedAt: Date = null){}

    /**
     * gets the general information about the achievement
     *
     * @param forceRefresh should the cache be ignored
     */
    abstract info(forceRefresh: boolean): AchievementInfo;
}

/**
 * an serverwide [[Achievement]] like the playtime achievements
 */
export class ServerAchievement extends Achievement {
    info(forceRefresh: boolean = false): any {
        return Server.achievements(forceRefresh).then(list => list.filter(achievement => achievement.id == this.id))[0];;
    }
}

/**
 * a [[Achievement]] of a certain [[GameType Game]]
 */
export class GameAchievement extends Achievement {
    constructor(id: string, progress: number, unlockedAt: Date, readonly game: GameType) {
        super(id, progress, unlockedAt);
    }

    info(forceRefresh: boolean = false): any {
        return this.game.achievements(forceRefresh)
            .then(list => list.filter(achievement => achievement.id == this.id))[0];
    }
}

/**
 * special class for the Achievement TheSwarm as is has some special data
 */
export class TheSwarmAchievement extends ServerAchievement{
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
    private _type: AchievementTypes = AchievementTypes.SERVER;
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
    }

    fromResponse(res: any): FromResponseFactory<Achievement> {
        this.progress(res.progress)
            .unlockedAt(new Date(res.unlockedAt*1000));

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
        default:
            // test by the name and id
            let matchingTypes = GameTypes.list
                .filter((type) => type.id === name.toUpperCase() || type.name.toLowerCase() === name.toLowerCase());

            if(matchingTypes.length > 0){
                return matchingTypes[0];
            }

            throw `Unknown SwarmGameId: ${name}`
    }
}
