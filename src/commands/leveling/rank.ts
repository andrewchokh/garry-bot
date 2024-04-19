import {
    CommandInteraction,
    GuildMember,
    GuildMemberRoleManager,
    SlashCommandBuilder
} from "discord.js";
import {fetchOrCreateUser} from "../../database/queries/user";
import {calculateLevelXp} from "../../utils/calculateLevelXp";
import {getLevelCard} from "../../utils/getLevelCard";
import {fetchOrCreateGuild} from "../../database/queries/guild";

const slashCommand = new SlashCommandBuilder()
.setName('rank')
.setDescription('Shows your level on the server')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        if (!interaction.guild) return;

        const userRecord = await fetchOrCreateUser(interaction.user.id, interaction.guild.id);
        const leveling = userRecord.leveling;

        const guildRecord = await fetchOrCreateGuild(interaction.guild.id);
        const levelRoleIds = guildRecord.leveling.levelRoleIds;

        const levelUpMilestone = calculateLevelXp(leveling.level);

        const currentRank = (interaction.member?.roles as GuildMemberRoleManager).cache.find(
            role =>  levelRoleIds.includes({role: role.id})
        );

        const levelRoleIdIndex = currentRank ? levelRoleIds.indexOf({role: currentRank.id}) : -1;

        const image = await getLevelCard(
            interaction.member as GuildMember, leveling.xp, leveling.level, levelRoleIdIndex + 1, levelUpMilestone
        );

        await interaction.reply({files: [{ attachment: image.toBuffer(), name: 'rank.png' }]});
    }
};