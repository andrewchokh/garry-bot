import {
    CategoryChannel,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    EmbedField,
    PermissionsBitField,
    SlashCommandBuilder,
    TextChannel,
    VoiceChannel
} from "discord.js";
import {CommandCategory} from "../../enums/command-category";

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Displays general information about the server.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .toJSON(),

    category: CommandCategory.General,

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return;

        const textChannels = interaction.guild.channels.cache.filter(
            channel => channel instanceof TextChannel
        );
        const voiceChannels = interaction.guild.channels.cache.filter(
            channel => channel instanceof VoiceChannel
        );
        const categoryChannels = interaction.guild.channels.cache.filter(
            channel => channel instanceof CategoryChannel
        );

        const guildMembers = interaction.guild.members.cache;

        const guildHumans = interaction.guild.members.cache.filter(
            member => !member.user.bot
        );

        const guildBots = interaction.guild.members.cache.filter(
            member => member.user.bot
        );

        const fields: EmbedField[] = [
            {
                name: 'Server Owner',
                value: `<@${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: 'Members',
                value: `👤 Members: ${guildMembers.size}\n🧑 Humans: ${guildHumans.size}\n🤖 Bots: ${guildBots.size}`,
                inline: true
            },
            {
                name: 'Channels',
                value: `💬 Texts: ${textChannels.size}\n🔊 Voices: ${voiceChannels.size}\n📣 Categories: ${categoryChannels.size}`,
                inline: true
            },
            {
                name: 'Verification Level',
                value: String(interaction.guild.verificationLevel),
                inline: true
            },
            {
                name: 'Boost Count',
                value: String(interaction.guild.premiumSubscriptionCount),
                inline: true
            },
            {
                name: 'Boost Tier',
                value: String(interaction.guild.premiumTier),
                inline: true},
            {
                name: 'Features',
                value: interaction.guild.features.join(", ") || "None",
                inline: false
            },
        ];

        const embed = new EmbedBuilder()
        .setTitle('Server Info')
        .setAuthor({name: interaction.guild.name})
        .setThumbnail(interaction.guild.iconURL())
        .setColor(Colors.DarkBlue)
        .setFooter({
            text: `ID: ${interaction.guildId} | Created at ${interaction.guild.createdAt.toUTCString()}`
        })
        .addFields(fields);

        await interaction.reply({embeds: [embed]})
    }
};