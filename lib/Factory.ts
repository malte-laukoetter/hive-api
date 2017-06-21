import {PlayerGameInfoTimvFactory} from "./PlayerGameInfoTimv";

export interface Factory<T> {
    create() : T;
}

export const PlayerGameInfoFactories = {
    TIMV: PlayerGameInfoTimvFactory
};