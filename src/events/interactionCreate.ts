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
        const blacklistedChannelIds = guildRecord.preferences.blacklistedChannelIds;

        if ((botChannelIds.length &&
            !botChannelIds.includes(interaction.guildId)) ||
            blacklistedChannelIds.includes(interaction.guildId))
            return;

        const { commandName } = interaction;

        const commands = interaction.client.commands;

        try {
            const command = commands.find(
                command => command.get('name') === commandName
            );

            if (command) command.get('data').callback(interaction);
        }
        catch (error) {
            await interaction.reply({
                content: 'An unexpected error has occurred!', ephemeral: true
            });

            logger.error(error);
        }
    }
}