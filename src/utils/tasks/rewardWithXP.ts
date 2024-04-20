import {giveXp} from "../giveXp";

export function rewardMessageSender() {
    // Not Implemented
}

export function rewardVoiceMembers() {
    setInterval(async () => {
        for (const voiceMember of global.voiceMembers) {
            await giveXp(voiceMember.member, 10);
        }
    }, 60000);
}