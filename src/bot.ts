import {Client, ClientOptions, Collection} from "discord.js";
import {config} from "./config";
import {events} from "./events";
import {commands} from "./commands";

export class Bot extends Client {

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection<string, SlashCommandData>();

        global.messageSenders = [];
        global.voiceMembers = [];
    }

    loadEvents() {
        for (const event of events) {
            if (event.isOnce)
                this.once(event.name, (...args) => event.execute(...args));
            else
                this.on(event.name, (...args) => event.execute(...args));
        }
    }

    loadCommands() {
        for (const command of commands) {
            this.commands.set(command.data.name, command)
        }
    }

    build() {
        this.login(config.discordToken)
        .catch(e => console.log(e));
    }
}

