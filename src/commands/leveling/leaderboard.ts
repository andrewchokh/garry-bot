import {
    AttachmentBuilder,
    CommandInteraction,
    SlashCommandBuilder
} from "discord.js";
import {CommandCategory} from "../../enums/command-category";
import {fetchOrCreateUser} from "../../database/queries/user";
import {drawLevelLeaderboard} from "../../utils/draw-level-leaderboard";

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Shows top 10 members by their levels.')
    .toJSON(),

    category: CommandCategory.Leveling,

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return;

        const members = interaction.guild.members.cache
        //.filter(member => !member.user.bot);

        let leaderboardUsersData: LeaderboardUserData[] = [];
        for (const [_index, member] of members) {
            const userRecord = await fetchOrCreateUser(member.id, member.guild.id);
            leaderboardUsersData.push({
                member: member,
                xp: userRecord.leveling.xp,
                level: userRecord.leveling.level,
            });
        }

        leaderboardUsersData.sort((a, b) => b.level - a.level || b.xp - a.xp);
        leaderboardUsersData.slice(0, 10);

        const image = await drawLevelLeaderboard(leaderboardUsersData);

        const attachment = new AttachmentBuilder(image.toBuffer(), {name: 'leaderboard.png'})

        await interaction.reply({files: [attachment]});
    }
}