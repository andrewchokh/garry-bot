import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    SlashCommandUserOption,
    User
} from "discord.js";

const slashCommand = new SlashCommandBuilder()
.setName('avatar')
.setDescription('Sends user avatar.')
.addUserOption(new SlashCommandUserOption()
    .setName("user")
    .setRequired(true)
    .setDescription("User of the server.")
);

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        const user = interaction.options.getUser('user') as User;

        if (!user?.avatarURL()) return await interaction.reply({
            content: 'The user has no avatar.',
            ephemeral: true,
        })

        const embed = new EmbedBuilder()
        .setColor(0x0077C46B)
        .setAuthor({name: `${user?.displayName}'s avatar`})
        .setImage(user.avatarURL(), );

        await interaction.reply({embeds: [embed]});
    }
};