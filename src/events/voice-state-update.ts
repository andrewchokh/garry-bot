import {Events, VoiceState} from "discord.js";

export const event: EventData = {
    name: Events.VoiceStateUpdate,
    isOnce: false,

    async execute(oldState: VoiceState, newState: VoiceState) {
        if ((!newState.member || !newState.guild) || (!oldState.member || !oldState.guild)) return;
        if (newState.member?.user.bot || oldState.channelId === newState.channelId) return;

        if (newState.channelId) {
            global.voiceMembers.push(newState.member);
        }
        else if (oldState.channelId) {
            const index = global.voiceMembers.indexOf(oldState.member);
            global.voiceMembers.splice(index, 1);
        }
    }
}