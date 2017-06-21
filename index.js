let HiveApi = require('./build/main.js');


let player = new HiveApi.Player("Malte662");

async function main(){

    await HiveApi.GameTypes.update();

    HiveApi.GameTypes.list.forEach(async gametype => {
        let info = await player.gameInfo(gametype);

        console.log(gametype.id);
        console.log(Object.keys(info))
    });

    Promise.all(HiveApi.GameTypes.list.map(gametype => player.gameInfo(gametype)
    .then(data => Object.keys(data)))).then((data)=>{
       // console.log(properties)
        properties = new Map();

        data.forEach((dat)=>{
            dat.forEach((prop) => {
                if(!properties.has(prop)) properties.set(prop,0);

                properties.set(prop, properties.get(prop)+1);
            });
            //    properties = properties.filter((prop) => dat.indexOf(prop) !== -1);
        });

        for (let [key, value] of properties.entries()) {
            if(value < 5){
                properties.delete(key);
            }
        }

        return properties;
    }).then(console.log);

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

}

main();