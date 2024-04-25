import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Colors,
    CommandInteraction,
    CommandInteractionOptionResolver,
    ComponentType,
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    User
} from "discord.js";
import {updateUser} from "../../database/queries/user";
import {ButtonName} from "../../enums/button-name";
import {CommandCategory} from "../../enums/command-category";

async function set(interaction: CommandInteraction) {
    const options = interaction.options as CommandInteractionOptionResolver;
    const user = options.getUser('user') as User;
    const level = options.getInteger('level') as number;

    if (level < 1 || level > 100) return await interaction.reply({content: 'The level should be in the range from 1 to one 100.'});

    await updateUser(user.id, interaction.guild?.id as string, {$set: {'leveling.xp': 0, 'leveling.level': level}});

    await interaction.reply(`Done! Now <@${user.id}> is level ${level}.`);
}

async function reset(interaction: CommandInteraction) {
    const confirm = new ButtonBuilder()
    .setCustomId(ButtonName.Confirm)
    .setLabel('Confirm')
    .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
    .setCustomId(ButtonName.Cancel)
    .setLabel('Cancel')
    .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
    .addComponents(confirm, cancel) as any;

    const embed = new EmbedBuilder()
    .setTitle('ATTENTION!')
    .setDescription('You are going to reset ALL users level back to their initial values. The operation cannot be undone!\n\nPress "Confirm" to continue.')
    .setColor(Colors.NotQuiteBlack);

    const reply = await interaction.reply({
        embeds: [embed],
        components: [row]
    });

    const filter = (buttonInteraction: ButtonInteraction) => buttonInteraction.user.id === interaction.user.id;

    const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter
    });

    collector.on('collect', async (buttonInteraction) => {
        if (!buttonInteraction.guild) return;

        const members = buttonInteraction.guild.members.cache;

        if (buttonInteraction.customId === ButtonName.Confirm) {
            for (const member of members) {
                await updateUser(member[1].id, buttonInteraction.guild.id, {
                    $set: {'leveling.xp': 0, 'leveling.level': 1}
                });
            }

            await interaction.editReply({content: 'All levels has been reset.', components: [], embeds: []});
        }
        else if (buttonInteraction.customId === ButtonName.Cancel) {
            await interaction.deleteReply();
        }
    });
}

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Manages level system.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
        subcommand
        .setName('set')
        .setDescription('Sets level for the user.')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('User to apply the level.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option
            .setName('level')
            .setDescription('Level to assign.')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('reset')
        .setDescription('Resets levels for all users.')
    )
    .toJSON(),

    category: CommandCategory.Leveling,

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return;

        const options = interaction.options as CommandInteractionOptionResolver;
        const subcommandName  = options.getSubcommand();

        switch (subcommandName) {
            case 'set':
                await set(interaction);
                break;
            case 'reset':
                await reset(interaction);
                break;
        }
    }
};