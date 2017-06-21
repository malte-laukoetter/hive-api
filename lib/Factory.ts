import {PlayerGameInfoTimvFactory} from "./PlayerGameInfo/PlayerGameInfoTimv";
import {GameType, GameTypes} from "./GameType";
import {PlayerGameInfoRawFactory} from "./PlayerGameInfo/PlayerGameInfo";

export interface Factory<T> {
    create() : T;
}

export interface FromResponseFactory<T> extends Factory<T>{
    fromResponse(res : any): FromResponseFactory<T>;
}

export function playerGameInfoFactoryForGametype(type: GameType) {
    if(type.id == GameTypes.TIMV.id){
        return PlayerGameInfoTimvFactory;
    }else{
        return PlayerGameInfoRawFactory;
    }
}