/**
 * counts how in which games the achievement THESWARM was passed on till it reached the given player
 */

import {Player, PlayerInfo, TheSwarmAchievement} from "hive-api";

async function swarmGames(name: string) {
    // create the player we want to start with
    let player: Player = new Player(name);
    let games = {};

    while (player) {
        // get the information about the player
        let info: PlayerInfo = await player.info();

        // filter for the THESWARM achievement
        let swarm: TheSwarmAchievement = info.achievements.filter(a => a.id == "THESWARM")[0] as TheSwarmAchievement;

        // the initial persons do have the achievement but no game set so we need to check if a game is there before we
        // work with it
        if (swarm.theSwarmGame) {
            // add the game to the object if it isn't already
            if (!games[swarm.theSwarmGame.id]) games[swarm.theSwarmGame.id] = 0;

            // and increase the counter by one
            games[swarm.theSwarmGame.id] += 1;
        }

        // set the player to the player the swarm achievement is coming from
        player = swarm.theSwarmFrom;
    }

    // print the result
    console.log(games);
}

// call the function
swarmGames("Malte662");