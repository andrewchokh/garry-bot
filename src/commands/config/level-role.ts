import {
    Colors,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    PermissionFlagsBits,
    Role,
    SlashCommandBuilder
} from "discord.js";
import {fetchOrCreateGuild, updateGuild} from "../../database/queries/guild";
import {CommandCategory} from "../../enums/command-category";

async function add(interaction: CommandInteraction) {
    const options = interaction.options as CommandInteractionOptionResolver;
    const role = options.getRole('role') as Role;
    const level = options.getInteger('level') as number;

    const guildRecord = await fetchOrCreateGuild(interaction.guildId as string);
    const levelRoleIds = guildRecord.leveling.levelRoleIds as LevelRole[];

    if (levelRoleIds.find(levelRoleId => levelRoleId.level === level))
        return await interaction.reply('You can\'t assign more than one role to the same level!');

    await updateGuild(interaction.guild?.id as string,
        {$push: {'leveling.levelRoleIds': {level: level, roleId: role.id} as LevelRole}}
    );

    await interaction.reply(`New level role added: **level ${level}** — <@&${role.id}>`);
}

async function show(interaction: CommandInteraction) {
    const guildRecord = await fetchOrCreateGuild(interaction.guild?.id as string);
    const levelRoleIds = guildRecord.leveling.levelRoleIds
    .sort((a: LevelRole, b: LevelRole) => a.level - b.level);

    let message = '';
    for (const levelRoleId of levelRoleIds) {
        message += `Level ${levelRoleId.level} — <@&${levelRoleId.roleId}>\n`;
    }

    if (!message.length) message = 'Empty.';

    const embed = new EmbedBuilder()
    .setTitle('Level Roles')
    .setDescription(message)
    .setColor(Colors.DarkGold);

    await interaction.reply({embeds: [embed]});
}

async function remove(interaction: CommandInteraction) {
    const options = interaction.options as CommandInteractionOptionResolver;
    const level = options.getInteger('level') as number;

    const guildRecord = await fetchOrCreateGuild(interaction.guildId as string);
    const levelRoleIds = guildRecord.leveling.levelRoleIds as LevelRole[];

    if (levelRoleIds.find(levelRoleId => levelRoleId.level === level))
        await updateGuild(interaction.guild?.id as string,
            {$pull: {'leveling.levelRoleIds': {level: level}}}
        );
    else {
        return await interaction.reply('Level role not found!');
    }

    await interaction.reply('Level role removed!');
}

async function clear(interaction: CommandInteraction) {
    await updateGuild(interaction.guild?.id as string,
        {$set: {'leveling.levelRoleIds': []}}
    );

    await interaction.reply('All level roles cleared!');
}

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('level-role')
    .setDescription('Manages level roles.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
        subcommand
        .setName('add')
        .setDescription('Adds level role.')
        .addRoleOption(option =>
            option
            .setName('role')
            .setDescription('The role for rank.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option
            .setName('level')
            .setDescription('Level to earn the rank.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('show')
        .setDescription('Shows level roles.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setDescription('Removes level role.')
        .addIntegerOption(option =>
            option
            .setName('level')
            .setDescription('Level to earn the role.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('clear')
        .setDescription('Clears all level roles.')
    )
    .toJSON(),

    category: CommandCategory.Config,

    async execute(interaction: CommandInteraction) {
        const options = interaction.options as CommandInteractionOptionResolver;
        const subcommandName  = options.getSubcommand();

        switch (subcommandName) {
            case 'add':
                await add(interaction);
                break;
            case 'show':
                await show(interaction);
                break;
            case 'remove':
                await remove(interaction);
                break;
            case 'clear':
                await clear(interaction);
                break;
        }
    }
};