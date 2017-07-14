import {Player, FromResponseFactory} from "./main";

export class ChatReport {
    constructor(readonly id: string, readonly player: Player, readonly messages){}

    get link() {
        return `https://hivemc.com/chatlog/${this.id}`;
    }
}

export class ChatReportFactory implements FromResponseFactory<ChatReport>{
    private _player: Player = null;
    private _messages = "";
    private _id: string = "";

    create(): ChatReport {
        return new ChatReport(this._id, this._player, this._messages);
    }

    fromResponse(res: any): ChatReportFactory {
        return this
            .player(new Player(res.UUID))
            .messages(res.messages);
    }

    player(player: Player){
        this._player = player;

        return this;
    }

    messages(messages){
        this._messages = messages;

        return this;
    }

    id(id){
        this._id = id;

        return this;
    }
}