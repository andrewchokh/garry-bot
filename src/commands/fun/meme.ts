import {Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {Reddit} from "../../utils/socials/reddit";

const slashCommand = new SlashCommandBuilder()
.setName('meme')
.setDescription('Sends funny meme.')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        const redditClient = new Reddit("dankmemes");
        await redditClient.fetch('image');
        const image = redditClient.random();

        const embed = new EmbedBuilder()
        .setTitle('Dank Memes')
        .setImage(image.url)
        .setDescription(image.title)
        .setColor(Colors.Orange);

        await interaction.reply({embeds: [embed]});
    }
};