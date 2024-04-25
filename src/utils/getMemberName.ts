import {GuildMember} from "discord.js";

export function getMemberName(member: GuildMember) {
    return member.displayName ?? member.user.globalName;
}