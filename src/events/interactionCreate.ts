import {CommandInteraction, Events} from "discord.js";
import logger from "../logger";

export const data: EventData = {
    name: Events.InteractionCreate,
    isOnce: false,
    callback: async (interaction: CommandInteraction) => {
        if (!interaction.isCommand()) return;

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