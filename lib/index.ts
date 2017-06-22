import {GameTypes, Player} from "./main";


export async function main(){
   // await GameTypes.update();

    //console.log((await new Player("Malte662").info()).medals);
  //  new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);

    GameTypes.list.forEach(async (gametype)=>{
        await gametype.info()
    })

  //  GameTypes.SKY.latestGames().then(games => games.forEach((game)=>game.info().then(console.log)))
  //  GameTypes.GRAV.info().then(console.log);

    //console.log(GameTypes.list.map(type => type.id));
}


