import {TimvPlayerGameInfoFactory} from "./PlayerGameInfo/TimvPlayerGameInfo";
import {GameType, GameTypes} from "./GameType";
import {RawPlayerGameInfoFactory} from "./PlayerGameInfo/PlayerGameInfo";
import {SgGameInfoFactory} from "./GameInfo/SgGameInfo";
import {SgnGameInfoFactory} from "./GameInfo/SgnGameInfo";
import {MimvGameInfoFactory} from "./GameInfo/MimvGameInfo";
import {SkyGameInfoFactory} from "./GameInfo/SkyGameInfo";
import {TimvGameInfoFactory} from "./GameInfo/TimvGameInfo";
import {DrGameInfoFactory} from "./GameInfo/DrGameInfo";
import {BasicGameInfoFactory} from "./GameInfo/GameInfo";

/**
 * an interface for all Factories that creates a instance of T
 */
export interface Factory<T> {
    /**
     * creates the instance of T
     */
    create() : T;
}

/**
 * an interface that extends the [[Factory]] with an method to set its data from a json object
 */
export interface FromResponseFactory<T> extends Factory<T>{
    /**
     * should fill the factory with the data of the given response
     *
     * @param res an object with the data
     */
    fromResponse(res : any): FromResponseFactory<T>;
}

/**
 * gets the [[PlayerGameInfoFactory]] for the given [[GameType]]
 * currently the following games have Factories that parse the data:
 *  * TIMV - [[TimvPlayerGameInfoFactory]]
 *
 * all other games just return a [[RawPlayerGameInfoFactory]]
 *
 * @param type the GameType to get the Factory for
 * @return {any} the class for the [[PlayerGameInfoFactory]] of the [[GameType]]
 */
export function playerGameInfoFactoryForGametype(type: GameType) {
    if(type.id == GameTypes.TIMV.id){
        return TimvPlayerGameInfoFactory;
    }else{
        return RawPlayerGameInfoFactory;
    }
}

/**
 * gets the [[GameInfoFactory]] for the given [[GameType]]
 * currently the following games have Factories that parse the data:
 *  * SG - [[SgGameInfoFactory]]
 *  * SGN - [[SgnGameInfoFactory]]
 *  * MIMV - [[MimvGameInfoFactory]]
 *  * DR - [[DrGameInfoFactory]]
 *  * TIMV - [[TimvGameInfoFactory]]
 *  * SKY - [[SkyGameInfoFactory]]
 *
 * all other games just return a [[BasicGameInfoFactory]]
 *
 * @param type the GameType to get the Factory for
 * @return {any} the class for the [[GameInfoFactory]] of the [[GameType]]
 */
export function gameInfoFactoryForGametype(type: GameType) {
    if(type.id === GameTypes.SG.id) {
        return SgGameInfoFactory;
    }else if(type.id === GameTypes.SGN.id){
        return SgnGameInfoFactory;
    }else if(type.id === GameTypes.MIMV.id){
        return MimvGameInfoFactory;
    }else if(type.id === GameTypes.DR.id){
        return DrGameInfoFactory;
    }else if(type.id === GameTypes.TIMV.id){
        return TimvGameInfoFactory;
    }else if(type.id === GameTypes.SKY.id){
        return SkyGameInfoFactory;
    }else{
        return BasicGameInfoFactory;
    }
}