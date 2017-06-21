import {GameTypes, Player} from "./main";


export async function main(){
   // await GameTypes.update();

 //   new Player("Malte662").gameInfo(GameTypes.GNTM).then(console.log);
  //  new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);

    /*GameTypes.list.forEach((gametype)=>{
        gametype.info().then(console.log)
    })*/

    GameTypes.SKY.latestGames().then(games => games.forEach((game)=>game.info().then(console.log)))
  //  GameTypes.GRAV.info().then(console.log);

    //console.log(GameTypes.list.map(type => type.id));
}


