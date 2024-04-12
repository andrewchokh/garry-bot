import {Events} from "discord.js";
import {Bot} from "../bot";

export const data: EventData = {
    name: Events.ClientReady,
    isOnce: true,
    callback: async (client: Bot) => {
        console.log(`Logged in as ${client.user?.tag}`);
    }
}