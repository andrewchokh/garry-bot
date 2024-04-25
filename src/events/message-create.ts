import {Events, GuildMember, Message} from "discord.js";

export const event: EventData = {
    name: Events.MessageCreate,
    isOnce: false,

    async execute(message: Message) {
        if (message.member?.user.bot || !message.member || !message.guild) return;

        let messageSender: GuildMember = global.messageSenders.find(
            messageSender => messageSender.id === message.member?.id
        ) as GuildMember;

        if (messageSender) return;

        messageSender = message.member;

        global.messageSenders.push(messageSender);
    }
}