import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {CommandCategory} from "../../enums/command-category";

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .toJSON(),

    category: CommandCategory.General,

    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const clientPing = reply.createdTimestamp - interaction.createdTimestamp;
        const websocketPing = interaction.client.ws.ping;

        await interaction.editReply(`Pong! — **Client:** ${clientPing}ms | **Websocket:** ${websocketPing}ms`);
    },
}