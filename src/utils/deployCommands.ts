import {REST, Routes} from "discord.js";
import {Bot} from "../bot";
import logger from "../logger";
import {config} from "../config";

const rest = new REST({ version: "10" }).setToken(config.discordToken);

export async function deployCommands(client: Bot, guildId?: string) {
    const commands = [];
    for (const command of client.commands) {
        commands.push(command[1].data);
    }

    logger.info("Started refreshing application (/) commands.");

    // If guildId is not specified, applied application commands will be global!
    try {
        if (guildId) {
            await rest.put(
                Routes.applicationGuildCommands(config.discordClientId, guildId),
                { body: commands });
        }
        else {
            await rest.put(
                Routes.applicationCommands(config.discordClientId),
                { body: commands },
            );
        }

        logger.info("Successfully reloaded application (/) commands.")
    }
    catch (error) {
        logger.error(error);
    }
}