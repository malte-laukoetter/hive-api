import {GameType, fetch, Methods, GameTypes, Player} from "./main";

export class Leaderboard {
    static readonly maxPageSize: number = 200;
    static readonly firstPlace: number = 0;
    static readonly lastPlace: number = 1000;

    private static cache: Map<String, Map<number, LeaderboardPlace>> = new Map();
    constructor(readonly game: GameType, readonly specialLeaderboard: string = null){
        if(!Leaderboard.cache.has(`${game.id}${specialLeaderboard}`)){
            Leaderboard.cache.set(`${game.id}${specialLeaderboard}`, new Map());
        }
    }

    private get cache(){
        return Leaderboard.cache.get(`${this.game.id}${this.specialLeaderboard}`);
    }

    async load(start: number, end: number): Promise<Map<number, LeaderboardPlace>>{
        end--; // only the start positions are 0 indexed... what the hack is this even...
        if(start > Leaderboard.lastPlace || end > Leaderboard.lastPlace || start < Leaderboard.firstPlace || end < Leaderboard.firstPlace)
            throw new Error("Places are out of bound");

        let result = new Map();
        let requestPositions = [];

        for(let i = start; i <= end; i++){
            if(this.cache.has(i)){
                result.set(i, this.cache.get(i));
            }else{
                requestPositions.push(i);
            }
        }

        if(requestPositions.length === 0) return result;

        let requests = [];

        for(let range of Leaderboard.generateRequestRanges(requestPositions)){
            range.end++; // the range isn't 0 indexed?! wtf!
            if(this.specialLeaderboard){
                requests.push(fetch(Methods.GAME_LEADERBOARD_SPECIAL(this.game.id, this.specialLeaderboard, range.start, range.end)));
            }else {
                requests.push(fetch(Methods.GAME_LEADERBOARD(this.game.id, range.start, range.end)));
            }
        }

        let results = await Promise.all(requests);

        results.forEach(res => {
            res = res.leaderboard;

            for(let place of res){
                let player = new Player(place.UUID);
                player.name = place.username;

                this.cache.set(place.index, new LeaderboardPlace(player, (place.points || place.total_points || place.karma), place.index, place));
                result.set(place.index, this.cache.get(place.index));
            }
        });

        return result;
    }

    deleteCache(){
        Leaderboard.cache.set(`${this.game.id}${this.specialLeaderboard}`, new Map());
    }

    async findPlayer(player: Player){
        if(!player.uuid) await player.info();

        let [gameInfo, lastPlace] = await Promise.all([
            player.gameInfo(this.game),
            this.load(980,1000).then(a => a.get(999))
        ]);

        if(gameInfo.points < lastPlace.points){
            return -1;
        }else{
            let cachedPlace = Array.from(this.cache.entries()).filter(([place, lP]) => lP.player.uuid === player.uuid);

            if(cachedPlace.length > 0) return cachedPlace[1];

            let {min, max} = await this.minMaxForPlayer(player);

            if(max - min > 200){
                let predictPlace = await this.findPlayerByPrediction(player, lastPlace);

                if(predictPlace !== -1) return predictPlace;
                let minMax = await this.minMaxForPlayer(player);

                min = minMax.min;
                max = minMax.max;
            }

            let place = Array.from((await this.load(min, max)).entries())
                .filter(([place, lP]) => lP.player.uuid === player.uuid);

            if(place.length < 1) throw new Error("Player should be in the leaderboard but wasn't found");

            return place[0][1];
        }
    }

    private async minMaxForPlayer(player: Player): Promise<{min,max}>{
        let minPos = 0;
        let maxPos = 1000;
        let gameInfo = await player.gameInfo(this.game);
        Array.from(this.cache.entries()).forEach(([place, lP]) => {
            if(gameInfo.points > lP.points && maxPos > place){
                maxPos = place-1;
            }else if(gameInfo.points < lP.points && minPos < place){
                maxPos = place+1;
            }
        });

        return {min: minPos, max: maxPos};
    }

    private async findPlayerByPrediction(player: Player, lastPlace: LeaderboardPlace){
        let predictedPlace = Leaderboard.predictedPlace((await player.gameInfo(this.game)).points, lastPlace.points);

        if(predictedPlace > 900){
            predictedPlace = 900;
        }else if(predictedPlace < 100){
            predictedPlace = 100;
        }

        let places = await this.load(predictedPlace-100, predictedPlace+100);

        let place = Array.from(places).filter(([place, p]) => p.player.uuid === player.uuid);

        if(place.length > 0){
            return place[1];
        }else{
            return -1;
        }
    }

    static generateRequestRanges(positions): {start,end}[]{
        positions.sort((a,b) => a-b);
        let ranges: {start,end}[] = [];

        while(positions.length != 0){
            let start = positions[0];
            let end = start;
            positions.shift();

            while(positions[0] < start+Leaderboard.maxPageSize){
                end = positions[0];
                positions.shift();
            }

            ranges.push({
                start: start,
                end: end
            });
        }

        return ranges;
    }

    /**
     * formal to predict the place a player will most likely have (generated through trying to find an exponentia
     * function that represents the points of hide and seek the best and then calculating the inverse
     *
     * the calculated formal was ((Math.E ** (place/100)) * 200 + pointsPlace1000)
     */
    static predictedPlace(points, pointsPlace1000){
        return Math.floor(1000 - Math.log(((points - (pointsPlace1000)) / 200)) * 100);
    }
}

export class LeaderboardPlace{
    constructor(readonly player: Player, readonly points: number, readonly place: number, readonly raw: object){}

    get humanPlace(){
        return this.place+1;
    }
}
