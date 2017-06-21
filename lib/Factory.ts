import {PlayerGameInfoTimvFactory} from "./PlayerGameInfoTimv";
import {GameType} from "./GameType";
import {PlayerGameInfoFactory} from "./PlayerGameInfo";

export interface Factory<T> {
    create() : T;
}

export interface FromResponseFactory<T> extends Factory<T>{
    fromResponse(res : any): FromResponseFactory<T>;
}

export function playerGameInfoFactory(type: GameType) {
    switch(type.id.toUpperCase()){
        case "TIMV": return PlayerGameInfoTimvFactory;
        default: return PlayerGameInfoFactory;
    }
}