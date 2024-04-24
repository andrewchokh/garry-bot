import {giveXp} from "../giveXp";

export function rewardMessageSender() {
    setInterval(async () => {
        for (const messageSender of global.messageSenders) {
            await giveXp(messageSender.member, 15);
        }

        global.messageSenders = [];
    }, 60000);
}

export function rewardVoiceMembers() {
    setInterval(async () => {
        for (const voiceMember of global.voiceMembers) {
            await giveXp(voiceMember.member, 10);
        }
    }, 60000);
}