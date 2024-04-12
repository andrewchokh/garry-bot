import {REST, Routes, SlashCommandBuilder} from "discord.js";
import {Bot} from "../bot";
import logger from "../logger";
import {config} from "../config";

const commands: Array<SlashCommandBuilder> = [];

const rest = new REST({ version: "10" }).setToken(config.discordToken);

function unpackCommands(client: Bot) {
    for (const commandCol of client.commands) {
        const commandData = commandCol.get('data');

        commands.push(commandData.slashCommand);
    }
}

export async function deployCommands(client: Bot, guildId?: string) {
    if (!commands.length) unpackCommands(client);

    logger.info("Started refreshing application (/) commands.");

    // If guildId is not specified, applied application commands will be global
    // Bot needs application.commands scope to use them
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