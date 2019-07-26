import {Player, FromResponseFactory} from "./main";

export class ChatMessage {
    constructor(readonly player: Player, readonly message: string, readonly date: Date){}
}

export class ChatReport {
    constructor(readonly id: string, readonly player: Player, readonly messages: ChatMessage[]){}

    get link() {
        return `https://hivemc.com/chatlog/${this.id}`;
    }
}

const MESSAGE_PARSE_REGEX = /\[(?<day>\d\d)\/(?<month>\d\d)\/(?<year>\d\d\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)]  (?<name>[a-zA-Z0-9_]+): (?<message>.*)/

export class ChatReportFactory implements FromResponseFactory<ChatReport>{
    private _player: Player = null;
    private _messages: ChatMessage[] = [];
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

    messages(messages: string){
        this._messages = messages.split('\\n').map(unparsedMessage => {
            if(unparsedMessage) {
                const {
                    day, month, year,
                    hour, minute, second,
                    name,
                    message
                } = unparsedMessage.match(MESSAGE_PARSE_REGEX).groups

                return new ChatMessage(
                    new Player(name),
                    message,
                    new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10))
                )
            }
        }).filter(a => a);

        return this;
    }

    id(id: string){
        this._id = id;

        return this;
    }
}