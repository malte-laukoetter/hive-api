import {GameTypes} from "./main";


export async function main(){
    await GameTypes.update();

    console.log(GameTypes.list.map(type => type.id));
}


