import {giveXp} from "../give-xp";

export function rewardMessageSender() {
    setInterval(async () => {
        for (const messageSender of global.messageSenders) {
            await giveXp(messageSender, 15);
        }

        global.messageSenders = [];
    }, 60000);
}

export function rewardVoiceMembers() {
    setInterval(async () => {
        for (const voiceMember of global.voiceMembers) {
            await giveXp(voiceMember, 10);
        }
    }, 60000);
}