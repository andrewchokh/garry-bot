import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const slashCommand = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with pong.')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const clientPing = reply.createdTimestamp - interaction.createdTimestamp;
        const websocketPing = interaction.client.ws.ping;

        await interaction.editReply(`Pong! — **Client:** ${clientPing}ms | **Websocket:** ${websocketPing}ms`);
    }
};