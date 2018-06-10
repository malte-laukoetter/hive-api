import { GameTypes, Player } from "./main";

// file for testing stuff

export async function main(){
  let p = new Player('Lergin_')

  let info = await p.gameInfo(GameTypes.DR)

  console.log(info)
}
