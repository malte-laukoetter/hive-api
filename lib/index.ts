import {GameTypes, Player, Server} from "./main";
import {PlayerInfo} from "./PlayerInfo";
import {Achievement, TheSwarmAchievement} from "./Achievement";


export async function main(){
    await GameTypes.update();

    //Server.achievements().then(console.log);
    //console.log(GameTypes.HIDE.name)

    let player = new Player("mangy001");
    //player.info().then(console.log)
    let players = [];
    let games = {};

    while(player){
        players.push(player);
        let info: PlayerInfo = await player.info();

        let swarm: TheSwarmAchievement = info.achievements.filter(a => a.id == "THESWARM")[0] as TheSwarmAchievement;

        if(swarm.theSwarmGame){
            if(!games[swarm.theSwarmGame.id]) games[swarm.theSwarmGame.id] = 0;

            games[swarm.theSwarmGame.id] += 1;
        }

        player = swarm.theSwarmFrom;
    }

    console.log(games);

    //new Player("Malte662").info().then((info) => info.achievements[1].theSwarmFrom.info()).then(console.log)

  //  console.log((await new Player("Malte662").info()).firstLogin.toLocaleString());
  //  new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);

  /*  GameTypes.list.forEach(async (gametype)=>{
        await gametype.info()
    })*/
  //  GameTypes.SKY.latestGames().then(games => games.forEach((game)=>game.info().then(console.log)))
  //  GameTypes.GRAV.info().then(console.log);

    //console.log(GameTypes.list.map(type => type.id));
}


