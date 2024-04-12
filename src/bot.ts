import {Client} from "discord.js";
import {config} from "./config";

export class Bot extends Client {
    build(){
        this.login(config.discordToken)
        .then(() => console.log('The bot is online!'))
        .catch(e => console.log(e));
    }
}

