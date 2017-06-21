import {GameTypes, Player} from "./main";


export async function main(){
   // await GameTypes.update();

    new Player("Malte662").gameInfo(GameTypes.GNTM).then(console.log);
    new Player("Malte662").gameInfo(GameTypes.TIMV).then(console.log);

    //console.log(GameTypes.list.map(type => type.id));
}


