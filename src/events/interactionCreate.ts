import {CommandInteraction, Events} from "discord.js";
import logger from "../logger";
import {fetchOrCreateGuild} from "../database/queries/guild";

export const data: EventData = {
    name: Events.InteractionCreate,
    isOnce: false,
    callback: async (interaction: CommandInteraction) => {
        if (!interaction.isCommand()) return;

        const guildRecord = await fetchOrCreateGuild(interaction.guildId as string);
        const botChannelIds = guildRecord.preferences.botChannelIds;

        if (botChannelIds.length && !botChannelIds.includes(interaction.guildId)) return;

        const { commandName } = interaction;

        const commands = interaction.client.commands

        try {
            const command = commands.find(
                command => command.get('name') === commandName
            );

            if (command) command.get('data').callback(interaction);
        }
        catch (error) {
            logger.error(error);
        }
    }
}