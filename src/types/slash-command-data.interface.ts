interface SlashCommandData {
    data: import('discord.js').RESTPostAPIChatInputApplicationCommandsJSONBody;
    category: import('../enums/command-category').CommandCategory;
    execute(interaction: import('discord.js').CommandInteraction): Promise<any>;
}