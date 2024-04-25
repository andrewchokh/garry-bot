import {Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {Reddit} from "../../utils/socials/reddit";
import {CommandCategory} from "../../enums/command-category";

const redditClient = new Reddit('dankmemes', 'image');

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Sends funny meme.')
    .toJSON(),

    category: CommandCategory.Fun,

    async execute(interaction: CommandInteraction) {
        const image = redditClient.random();

        const embed = new EmbedBuilder()
        .setTitle('Dank Memes')
        .setImage(image.url)
        .setDescription(image.title)
        .setColor(Colors.Orange);

        await interaction.reply({embeds: [embed]});
    }
};