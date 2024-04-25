import {GuildMember} from "discord.js";


declare global {
    var messageSenders: GuildMember[];
    var voiceMembers: GuildMember[];
}

export {}