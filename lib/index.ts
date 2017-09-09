import {BedPlayerGameInfo, SgPlayerGameInfo, SgPlayerGameInfoFactory, Game, GameTypes, Player, PlayerInfo, Server, SgGameInfo, Achievement, TheSwarmAchievement, DrGameInfo} from "./main";
import {
    PlayerGameInfoAchievements, PlayerGameInfoFactory,
    PlayerGameInfoFactoryAchievements
} from "./PlayerGameInfo/PlayerGameInfo";
import {PlayerInfoFactory, Rank} from "./PlayerInfo";


export async function main(){
    //await GameTypes.update();

    //Server.achievements().then(console.log);
    //GameTypes.MM.achievements().then(console.log)

    //new Player("Malte662").info().then((info) => info.achievements[1].theSwarmFrom.info()).then(console.log)

    let player: Player = new Player("heyimblake");
    await player.info();
    console.log(await player.getTwitter());

    player = new Player("Lergin_");
    await player.info();
    console.log(await player.getTwitter());

  //  player.info().then(i => i.achievements).then(a => a.filter(b => b.unlocked)).then(console.log)

   // Server.developers().then(a => a.map(p => p.info().then(console.log)));

   // Server.chatreport("5968fbb60cf20e9bd5bad6d6").then(console.log);
   // Server.chatreport("W_5968fc3efbf1096e67b1cfa7").then(console.log);

/*  player.gameInfo(GameTypes.DR).then(console.log)
    player.gameInfo(GameTypes.BED).then(console.log)
    player.gameInfo(GameTypes.BP).then(console.log)
    player.gameInfo(GameTypes.HERO).then(console.log)
    player.gameInfo(GameTypes.RR).then(console.log)
    player.gameInfo(GameTypes.SG).then(console.log)
    player.gameInfo(GameTypes.SP).then(console.log)
    player.gameInfo(GameTypes.TIMV).then(console.log)
    player.gameInfo(GameTypes.MIMV).then(console.log)
    player.gameInfo(GameTypes.HB).then(console.log)
    player.gameInfo(GameTypes.CAI).then(console.log)
    player.gameInfo(GameTypes.CR).then(console.log)
    player.gameInfo(GameTypes.LAB).then(console.log)
    player.gameInfo(GameTypes.DRAW).then(console.log)
    player.gameInfo(GameTypes.SPL).then(console.log)
    player.gameInfo(GameTypes.SKY).then(console.log)*/
/*
    player.gameInfo(GameTypes.SLAP).then(console.log)
    player.gameInfo(GameTypes.EF).then(console.log)
    player.gameInfo(GameTypes.MM).then(console.log)
    player.gameInfo(GameTypes.GRAV).then(console.log)
    player.gameInfo(GameTypes.GNT).then(console.log)
    player.gameInfo(GameTypes.GNTM).then(console.log)
    player.gameInfo(GameTypes.PMK).then(console.log)
    player.gameInfo(GameTypes.SGN).then(console.log)
    player.gameInfo(GameTypes.BD).then(console.log)*/
 //   let playerBedInfo: SgPlayerGameInfo = (await player.gameInfo(GameTypes.SG)) as SgPlayerGameInfo;
    //player.info().then(info => info.rank).then(console.log);


/*
    let points = await Promise.all(
        GameTypes.list.map(async type => await player.gameInfo(type).then(info => info.points))
    ).then(points => points.reduce((a,b)=> (a)+b));

    console.log(points)
*/


  /*  if(new GameTypes.BP.playerGameInfoFactory() instanceof PlayerGameInfoFactoryAchievements){

    }
*/
     // GameTypes.list;//.forEach(console.log);

  //  GameTypes.list.filter(type => new type.playerGameInfoFactory().achievements !== undefined).map((res)=> console.log(res))
/*
    Promise.all(GameTypes.list.filter(type => type.playerGameInfoFactory instanceof PlayerGameInfoFactoryAchievements).map(console.log)).then(arr => {
        ([].concat.apply([], arr)).forEach(console.log)
    })*/
  //  console.log((await new Player("Malte662").info()).firstLogin.toLocaleString());
    //new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);

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


