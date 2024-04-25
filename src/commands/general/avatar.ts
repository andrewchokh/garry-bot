import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    SlashCommandUserOption,
    User
} from "discord.js";
import {CommandCategory} from "../../enums/command-category";

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Sends user avatar.')
    .addUserOption(new SlashCommandUserOption()
        .setName('user')
        .setRequired(false)
        .setDescription('User of the server.')
    )
    .toJSON(),

    category: CommandCategory.General,

    async execute(interaction: CommandInteraction) {
        const user = interaction.options.getUser('user') as User || interaction.user;

        if (!user?.avatarURL()) return await interaction.reply({
            content: 'The user has no avatar.',
            ephemeral: true,
        });

        const embed = new EmbedBuilder()
        .setColor(0x0077C46B)
        .setAuthor({name: `${user?.displayName}'s avatar`})
        .setImage(user.avatarURL());

        await interaction.reply({embeds: [embed]});
    }
};