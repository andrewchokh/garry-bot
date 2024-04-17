import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {fetchOrCreateUser} from "../../database/queries/user";
import {calculateLevelXp} from "../../utils/calculateLevelXp";

const slashCommand = new SlashCommandBuilder()
.setName('level')
.setDescription('Shows your level on the server')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        if (!interaction.guild) return;

        const userRecord = await fetchOrCreateUser(interaction.user.id, interaction.guild.id);
        const leveling = userRecord.leveling;

        const levelUpMilestone = calculateLevelXp(leveling.level);

        let progress = leveling.xp % levelUpMilestone / levelUpMilestone;
        const emojiCount = Math.round(progress * 20)

        const barStr = `${':blue_square:'.repeat(emojiCount)}${':white_large_square:'.repeat(20 - emojiCount)}`;

        const embed = new EmbedBuilder()
        .setColor(0x00FFFF00)
        .setAuthor({name: `${interaction.user.globalName}'s level card`, iconURL: interaction.user.avatarURL() as string})
        .setDescription(`${barStr}\n`)
        .addFields(
            {name: 'Level', value: String(leveling.level), inline: true},
            {name: 'Experience', value: String(leveling.xp), inline: true},
            {name: 'Milestone', value: String(levelUpMilestone), inline: true}
        )

        await interaction.reply({embeds: [embed]});
    }
};