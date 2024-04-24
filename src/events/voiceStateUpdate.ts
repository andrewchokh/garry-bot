import {Events, VoiceState} from "discord.js";

export const data: EventData = {
    name: Events.VoiceStateUpdate,
    isOnce: false,
    callback: async (oldState: VoiceState, newState: VoiceState) => {
        if ((!newState.member || !newState.guild) || (!oldState.member || !oldState.guild)) return;
        if (newState.member?.user.bot || oldState.channelId === newState.channelId) return;

        voiceMembers = global.voiceMembers;

        console.log(voiceMembers)

        if (newState.channelId) {
            const voiceMember: MetaMember = {
                member: newState.member,
                guild: newState.guild
            };

            voiceMembers.push(voiceMember);
        }
        else if (oldState.channelId) {
            const voiceMember: MetaMember = {
                member: oldState.member,
                guild: oldState.guild
            };

            const index = voiceMembers.indexOf(voiceMember);
            voiceMembers.splice(index, 1);
        }
    }
}