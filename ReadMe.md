# Hive-Api-Node

> A node.js wrapper for the api of https://hivemc.com, written in TypeScript and using Promises


## Install

```
$ npm install hive-api
```

## Documentation

http://hive-api.lergin.de

Note: some classes do not expose there properties in the documentation in the right way and only show them in the constructor


## Usage

### JavaScript

```js
const hive = require('hive-api');

let player = new hive.Player("Malte662");

player.info().then(info => {
    console.log(`Tokens: ${info.tokens}`)
});
```

### TypeScript
```typescript
import {Player} from "hive-api";

let player: Player = new Player("Malte662");

player.info().then((info: PlayerInfo) => {
    console.log(`Tokens: ${info.tokens}`)
});
```


## Examples

Some examples are using async / await and therefor need to be wrapped into a async function. See: [async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)


### Print the unique players of each game

```typescript
import {GameTypes, GameType} from "hive-api";

await GameTypes.update(); // update the list of GameTypes

GameTypes.list.forEach((type: GameType) => {
    type.uniquePlayers().then((players) => {
        console.log(`${type.name}: ${players} players`);
    });
});
```


### Get the global achievements of the winner of the latest survival games game

```typescript
import {GameTypes, Game, SgGameInfo, PlayerInfo, ServerAchievement, AchievementInfo} from "hive-api";

GameTypes.SG.latestGames()
    .then(games => games[0])
    .then((game: Game) => game.info())
    .then(async (gameInfo: SgGameInfo) => {
        let winnerInfo: PlayerInfo = await gameInfo.winner.info();

        winnerInfo.achievements.forEach((achievement: ServerAchievement) =>{
            achievement.info().then((info: AchievementInfo) => info.name)
            .then(console.log)
        });
    }).catch(console.error);
```


### List the names of the skywars maps

```typescript
import {GameTypes, GameMap} from "hive-api";

GameTypes.SKY.maps()
    .then((maps: GameMap[]) => maps.map((map: GameMap) => map.worldName))
    .then(console.log)
```


### Get the amount of Beds destroyed by Malte662 in Bedwars

```typescript
import {Player, BedPlayerGameInfo, GameTypes} from "hive-api"

let player: Player = new Player("Malte662");

let playerBedInfo: BedPlayerGameInfo = (await player.gameInfo(GameTypes.BED)) as BedPlayerGameInfo;

console.log(playerBedInfo.bedsDestroyed);
```