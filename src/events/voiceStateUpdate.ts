import {Events, VoiceState} from "discord.js";
import {delay} from "../utils/delay";
import {giveXp} from "../utils/giveXp";

export const data: EventData = {
    name: Events.VoiceStateUpdate,
    isOnce: false,
    callback: async (_oldState: VoiceState, newState: VoiceState) => {
        if (newState.member?.user.bot) return;

        while (newState.member?.voice.channelId) {
            await delay(60000);
            await giveXp(newState.member, 10);
        }
    }
}