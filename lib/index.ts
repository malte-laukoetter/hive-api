import {SgPlayerGameInfo, SgPlayerGameInfoFactory, Game, GameTypes, Player, PlayerInfo, Server, SgGameInfo, Achievement, TheSwarmAchievement, DrGameInfo} from "./main";


export async function main(){
    await GameTypes.update();

    //Server.achievements().then(console.log);
    //GameTypes.MM.achievements().then(console.log)

    //new Player("Malte662").info().then((info) => info.achievements[1].theSwarmFrom.info()).then(console.log)

    let player = new Player("Malte662");

    let points = await Promise.all(
        GameTypes.list.map(async type => await player.gameInfo(type).then(info => info.points))
    ).then(points => points.reduce((a,b)=> (a)+b));

    console.log(points)

  //  console.log((await new Player("Malte662").info()).firstLogin.toLocaleString());
    //new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);
    //new Player("Malte662").gameInfo(GameTypes.SKY).then(console.log);

   // GameTypes.list.map((gametype)=> `${gametype.id}: ${gametype.name}`).map(console.log)
  //  GameTypes.SKY.latestGames().then(games => games.forEach((game)=>game.info().then(console.log)))
  //  GameTypes.GRAV.info().then(console.log);

    //console.log(GameTypes.list.map(type => type.id));

    /*GameTypes.DR.latestGames()
        .then(games => games[0])
        .then((game: Game) => game.info())
        .then(async (gameInfo: DrGameInfo) => {
            console.log(gameInfo.winners)
        }).catch(console.error);*/
}


