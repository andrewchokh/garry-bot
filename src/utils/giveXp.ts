import {GuildMember, TextChannel} from "discord.js";
import {fetchOrCreateUser, updateUser} from "../database/queries/user";
import {fetchOrCreateGuild} from "../database/queries/guild";
import {calculateLevelXp} from "./calculateLevelXp";

async function sendLevelUpMessage(member: GuildMember, level: number) {
    const guildRecord = await fetchOrCreateGuild(member.guild.id);

    const levelUpChannel = member.guild.channels.cache.find(
        channel => channel.id === guildRecord.moderation.levelChannelId
    ) as TextChannel ?? member.dmChannel ?? await member.createDM();

    await levelUpChannel.send(`Congratulations! <@${member.id}> have reached level **${level}**!`)
}

export async function giveXp(member: GuildMember, amount: number) {
    await updateUser(member.id, member.guild.id, {$inc: {'leveling.xp': amount}});

    const userRecord = await fetchOrCreateUser(member.id, member.guild.id);
    const leveling = userRecord.leveling;

    if (leveling.xp < calculateLevelXp(leveling.level) || leveling.level >= 100) return;

    await updateUser(member.id, member.guild.id, {$set: {'leveling.xp': 0}});
    await updateUser(member.id, member.guild.id, {$inc: {'leveling.level': 1}});

    await sendLevelUpMessage(member, leveling.level + 1);
}