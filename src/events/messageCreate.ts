import {Events, Message} from "discord.js";

export const data: EventData = {
    name: Events.MessageCreate,
    isOnce: false,
    callback: async (message: Message) => {
        if (message.member?.user.bot || !message.member || !message.guild) return;

        let messageSender: MetaMember = global.messageSenders.find(
            messageSender => messageSender.member.id === message.member?.id
        ) as MetaMember;

        if (messageSender) return;

        messageSender = {
            member: message.member,
            guild: message.guild
        };

        global.messageSenders.push(messageSender);
    }
}