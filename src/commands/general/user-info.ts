import {
    Colors,
    CommandInteraction,
    EmbedBuilder,
    EmbedField,
    GuildMember,
    PermissionsBitField,
    SlashCommandBuilder,
    SlashCommandUserOption
} from "discord.js";
import {CommandCategory} from "../../enums/command-category";

export const command: SlashCommandData = {
    data: new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Displays general information about the user.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addUserOption(new SlashCommandUserOption()
        .setName("member")
        .setRequired(true)
        .setDescription("Member of the server.")
    )
    .toJSON(),

    category: CommandCategory.General,

    async execute(interaction: CommandInteraction) {
        const member = interaction.options.getMember('member') as GuildMember;

        const userRoles = member.roles.cache
        .filter((role) => role.name !== "@everyone")
        .sort((a, b) => b.position - a.position)
        .map((role) => `${role}`);

        const fields: EmbedField[] = [
            {
                name: 'Joined At',
                value: member.joinedAt?.toUTCString() as string,
                inline: true
            },
            {
                name: 'Roles',
                value: userRoles.join('\n'),
                inline: false
            },
        ];

        const embed = new EmbedBuilder()
        .setTitle('User Info')
        .setAuthor({name: `${member.nickname ?? member.user.displayName} (${member.user.username})`})
        .setThumbnail(member.user.avatarURL())
        .setColor(Colors.Blue)
        .setFooter({text: `ID: ${member.user.id} | Registered At ${member.user.createdAt.toUTCString()}`})
        .addFields(fields);

        await interaction.reply({embeds: [embed]});
    }
};