import {CommandInteraction, Events} from "discord.js";
import logger from "../logger";
import {fetchOrCreateGuild} from "../database/queries/guild";

export const event: EventData = {
    name: Events.InteractionCreate,
    isOnce: false,

    async execute(interaction: CommandInteraction) {
        if (!interaction.isCommand()) return;

        const guildRecord = await fetchOrCreateGuild(interaction.guildId as string);
        const botChannelIds = guildRecord.preferences.botChannelIds;
        const blacklistedChannelIds = guildRecord.preferences.blacklistedChannelIds;

        if ((botChannelIds.length &&
            !botChannelIds.includes(interaction.guildId)) ||
            blacklistedChannelIds.includes(interaction.guildId))
            return;

        const command = interaction.client.commands.get(interaction.commandName);

        try {
            if (command) return await command.execute(interaction);

            await interaction.reply({
                content: 'Command is bot found!', ephemeral: true
            });
        }
        catch (error) {
            await interaction.reply({
                content: 'An unexpected error has occurred!', ephemeral: true
            });

            logger.error(error);
        }
    }
}