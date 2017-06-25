# Hive-Api-Node

> A node.js wrapper for the api of https://hivemc.com, written in TypeScript and using Promises


## Install

```
$ npm install --save hive-api
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

#### Print the unique players of each game

```typescript
await GameTypes.update(); // update the list of GameTypes

GameTypes.list.forEach((type: GameType) => {
    type.uniquePlayers().then((players) => {
        console.log(`${type.name}: ${players} players`);
    });
});
```


#### Get the global achievements of the winner of the latest survival games game
```typescript
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
