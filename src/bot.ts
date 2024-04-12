import {Client} from "discord.js";
import {config} from "./config";
import {events} from "./events";

export class Bot extends Client {
    loadEvents() {
        for (const event of events) {
            if (event.isOnce)
                this.once(event.name, (...args) => event.callback(...args));
            else
                this.on(event.name, (...args) => event.callback(...args));
        }
    }

    build(){
        this.login(config.discordToken)
        .catch(e => console.log(e));
    }
}

