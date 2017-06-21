import {Game} from "./Game";
import {GameType, GameTypes} from "./GameType";
import {Player} from "./Player";

const GameTypeInstance = new GameTypes();

export { GameType, GameTypeInstance as GameTypes, Game, Player };