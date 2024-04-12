import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const slashCommand = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with pong.')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        await interaction.reply('Pong!')
    }
};