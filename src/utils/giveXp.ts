import {GuildMember, Role, TextChannel} from "discord.js";
import {fetchOrCreateUser, updateUser} from "../database/queries/user";
import {fetchOrCreateGuild} from "../database/queries/guild";
import {calculateLevelXp} from "./calculateLevelXp";

async function sendMessage(member: GuildMember, message: string) {
    const guildRecord = await fetchOrCreateGuild(member.guild.id);

    const levelUpChannel = member.guild.channels.cache.find(
        channel => channel.id === guildRecord.moderation.levelChannelId
    ) as TextChannel ?? member.dmChannel ?? await member.createDM();

    await levelUpChannel.send({content: message});
}

async function giveLevelRoleIfExists(member: GuildMember, level: number) {
    const guildRecord = await fetchOrCreateGuild(member.guild.id);
    const levelRoleIds = guildRecord.leveling.levelRoleIds
    .sort((a: LevelRole, b: LevelRole) => a.level - b.level) as LevelRole[];

    const levelRoleId = levelRoleIds.find(
        levelRoleId => levelRoleId.level === level
    );

    if (!levelRoleId) return;

    const previousLevelRoleIdIndex = levelRoleIds.indexOf(levelRoleId) - 1;

    if (~previousLevelRoleIdIndex) {
        const previousLevelRole = member.guild.roles.cache.find(
            role => role.id === levelRoleIds[previousLevelRoleIdIndex].roleId
        ) as Role;

        await member.roles.remove(previousLevelRole);
    }

    const levelRole = member.guild.roles.cache.find(
        role => role.id === levelRoleId.roleId
    ) as Role;

    await member.roles.add(levelRole);

    await sendMessage(member, `Incredible! <@${member.id}> got new rank — <@&${levelRole.id}>`)
}

export async function giveXp(member: GuildMember, amount: number) {
    await updateUser(member.id, member.guild.id, {$inc: {'leveling.xp': amount}});

    const userRecord = await fetchOrCreateUser(member.id, member.guild.id);
    const leveling = userRecord.leveling;

    if (leveling.xp < calculateLevelXp(leveling.level) || leveling.level >= 100) return;

    await updateUser(member.id, member.guild.id, {$set: {'leveling.xp': 0}});
    await updateUser(member.id, member.guild.id, {$inc: {'leveling.level': 1}});

    await sendMessage(member, `Congratulations! <@${member.id}> have reached level **${leveling.level + 1}**!`);

    await giveLevelRoleIfExists(member, leveling.level + 1);
}