# Hive-Api-Node

A node.js wrapper for the api of https://hivemc.com


Content

* Introduction
* Examples
* Stuff

##Introduction

This wrapper is mostly based on Promises 

## Examples

#### Print the tokens of a player to the console
```typescript
let player: Player = new Player("Malte662");

player.info().then((info: PlayerInfo) => {
    console.log(`Tokens: ${info.tokens}`)
});
```


#### Print the unique players of each game

```typescript
await GameTypes.update(); // update the list of GameTypes

GameTypes.list.forEach((type: GameType) => {
    type.uniquePlayers().then((players) => {
        console.log(`${type.name}: ${players} players`);
    });
});
```


##### Get the global achievements of the winner of the latest SG game
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