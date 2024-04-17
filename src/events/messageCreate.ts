import {Events, GuildMember, Message} from "discord.js";
import {giveXp} from "../utils/giveXp";

export const data: EventData = {
    name: Events.MessageCreate,
    isOnce: false,
    callback: async (message: Message) => {
        if (message.member?.user.bot) return;

        await giveXp(message.member as GuildMember, 5);
    }
}