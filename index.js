let HiveApi = require('./build/index.js');

HiveApi.main()

/*

let player = new HiveApi.Player("Malte662");

async function main(){

    await HiveApi.GameTypes.update();

    Promise.all(HiveApi.GameTypes.list.filter(gametype => gametype.id === "TIMV").map(gametype => {
        return player.gameInfo(gametype).then(gameinfo => gametype.playerGameInfoFactory.createFromResponse(gameinfo))
    })).then(console.log)
*/
    /*
    HiveApi.GameTypes.list().then(res =>
        Promise.all([].concat.apply([], res.map(async type => {
            let latestGames = await type.latestGames();
            if(latestGames.length > 0){
                return Promise.all(latestGames.map((game) => game.info().then(info => console.log(`${type.id}: ${info.startTime}`))))
            }else{
                return Promise.all([]);
            }
        })))
    ).then(res =>[].concat.apply([],res));//.then(console.log).catch(console.error);

    //(new HiveApi.GameType("BED")).latestGames().then(console.log);

    */
/*
}

main();*/