import {PlayerGameInfoTimvFactory} from "./PlayerGameInfo/PlayerGameInfoTimv";
import {GameType, GameTypes} from "./GameType";
import {PlayerGameInfoRawFactory} from "./PlayerGameInfo/PlayerGameInfo";
import {SgGameInfoFactory} from "./GameInfo/SgGameInfo";
import {SgnGameInfoFactory} from "./GameInfo/SgnGameInfo";
import {MimvGameInfoFactory} from "./GameInfo/MimvGameInfo";
import {SkyGameInfoFactory} from "./GameInfo/SkyGameInfo";
import {TimvGameInfoFactory} from "./GameInfo/TimvGameInfo";
import {DrGameInfoFactory} from "./GameInfo/DrGameInfo";
import {DefaultGameInfoFactory} from "./GameInfo/GameInfo";

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
        return DefaultGameInfoFactory;
    }
}