import {Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {Reddit} from "../../utils/socials/reddit";

const redditClient = new Reddit('dankmemes', 'image');

const slashCommand = new SlashCommandBuilder()
.setName('meme')
.setDescription('Sends funny meme.')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        const image = redditClient.random();

        const embed = new EmbedBuilder()
        .setTitle('Dank Memes')
        .setImage(image.url)
        .setDescription(image.title)
        .setColor(Colors.Orange);

        await interaction.reply({embeds: [embed]});
    }
};