import {GameType, GameTypes, RawPlayerGameInfoFactory, TimvPlayerGameInfoFactory, SgGameInfoFactory, SgnGameInfoFactory,
    MimvGameInfoFactory, SkyGameInfoFactory, TimvGameInfoFactory, DrGameInfoFactory, BasicGameInfoFactory,
    BedPlayerGameInfoFactory, BpPlayerGameInfoFactory, SgPlayerGameInfoFactory, DrPlayerGameInfoFactory,
    HeroPlayerGameInfoFactory, RrPlayerGameInfoFactory, SpPlayerGameInfoFactory
} from "./main";

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
 *  * BED - [[BedPlayerGameInfoFactory]]
 *  * SG - [[SgPlayerGameInfoFactory]]
 *  * BP - [[BpPlayerGameInfoFactory]]
 *  * DR - [[DrPlayerGameInfoFactory]]
 *  * HERO - [[HeroPlayerGameInfoFactory]]
 *  * RR - [[RrPlayerGameInfoFactory]]
 *  * SP - [[SpPlayerGameInfoFactory]]
 *
 * all other games just return a [[RawPlayerGameInfoFactory]]
 *
 * @param type the GameType to get the Factory for
 * @return the class for the [[PlayerGameInfoFactory]] of the [[GameType]]
 */
export function playerGameInfoFactoryForGametype(type: GameType) {
    switch(type.id){
        case GameTypes.TIMV.id:
            return TimvPlayerGameInfoFactory;
        case GameTypes.BED.id:
            return BedPlayerGameInfoFactory;
        case GameTypes.SG.id:
            return SgPlayerGameInfoFactory;
        case GameTypes.BP.id:
            return BpPlayerGameInfoFactory;
        case GameTypes.DR.id:
            return DrPlayerGameInfoFactory;
        case GameTypes.HERO.id:
            return HeroPlayerGameInfoFactory;
        case GameTypes.RR.id:
            return RrPlayerGameInfoFactory;
        case GameTypes.SP.id:
            return SpPlayerGameInfoFactory;
        default:
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
 * @return the class for the [[GameInfoFactory]] of the [[GameType]]
 */
export function gameInfoFactoryForGametype(type: GameType) {
    switch(type.id){
        case GameTypes.SG.id:
            return SgGameInfoFactory;
        case GameTypes.SGN.id:
            return SgnGameInfoFactory;
        case GameTypes.MIMV.id:
            return MimvGameInfoFactory;
        case GameTypes.DR.id:
            return DrGameInfoFactory;
        case GameTypes.TIMV.id:
            return TimvGameInfoFactory;
        case GameTypes.SKY.id:
            return SkyGameInfoFactory;
        default:
            return BasicGameInfoFactory;
    }
}