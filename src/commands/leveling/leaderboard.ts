import {
    CommandInteraction,
    EmbedBuilder,
    EmbedField,
    GuildMember,
    SlashCommandBuilder
} from "discord.js";
import {CommandCategory} from "../../enums/command-category";
import {fetchOrCreateUser} from "../../database/queries/user";

type LeaderboardUserData = {
    member: GuildMember,
    xp: number,
    level: number,
}

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Shows top 10 members by their levels.')
    .toJSON(),

    category: CommandCategory.Leveling,

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return;

        const members = interaction.guild.members.cache;
        const membersLevelingData: LeaderboardUserData[] = [];

        for (const member of members) {
            const userRecord = await fetchOrCreateUser(member[1].id, interaction.guild.id);

            membersLevelingData.push({
                member: member[1],
                xp: userRecord.leveling.xp,
                level: userRecord.leveling.level,
            });
        }

        membersLevelingData.sort(
            (a, b) => b.level - a.level && b.xp - a.xp
        );

        const fields: EmbedField[] = [];
        for (const memberLevelData of membersLevelingData) {
            const index = membersLevelingData.indexOf(memberLevelData);

            fields.push({
                name: `Member #${index + 1}`,
                value:  `${memberLevelData.member.displayName ?? memberLevelData.member.user.globalName}`,
                inline: true,
            })

            fields.push({
                name: 'Level',
                value: `\`${memberLevelData.level}\``,
                inline: true,
            })

            fields.push({
                name: 'Experience',
                value: `\`${memberLevelData.xp} points\`\n`,
                inline: true,
            })
        }

        const embed = new EmbedBuilder()
        .setTitle('Leaderboard')
        .addFields(fields);

        await interaction.reply({embeds: [embed]});
    }
}