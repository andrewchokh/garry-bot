import {Bot} from "./bot";
import botOptions from "./config/bot.json"
import {ClientOptions} from "discord.js";

const client = new Bot(botOptions as ClientOptions);

client.loadEvents();
client.loadCommands();
client.build();



