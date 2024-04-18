import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {fetchOrCreateUser} from "../../database/queries/user";
import {calculateLevelXp} from "../../utils/calculateLevelXp";
import {createCanvas, loadImage} from "canvas";

const slashCommand = new SlashCommandBuilder()
.setName('rank')
.setDescription('Shows your rank on the server')

export const data: CommandData = {
    slashCommand: slashCommand,

    callback: async (interaction: CommandInteraction) => {
        if (!interaction.guild) return;

        const userRecord = await fetchOrCreateUser(interaction.user.id, interaction.guild.id);
        const leveling = userRecord.leveling;

        const levelUpMilestone = calculateLevelXp(leveling.level);

        const canvas = createCanvas(855, 225);
        const canvasContext = canvas.getContext('2d');
        const barWidth = 540;
        const background = await loadImage('assets/images/level_card_background.png');
        const avatar = await loadImage(interaction.user.displayAvatarURL({extension: 'png', forceStatic: true}));

        canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);

        canvasContext.stroke()
        canvasContext.closePath();

        // XP Bar
        canvasContext.lineJoin = 'round';
        canvasContext.lineWidth = 30;

        // Empty XP Bar
        canvasContext.strokeStyle = '#292C32';
        canvasContext.strokeRect(270, 170, barWidth, 1);

        // Filled XP bar
        canvasContext.strokeStyle = '#FFFFFF';
        canvasContext.strokeRect(270, 170, barWidth * leveling.xp / levelUpMilestone, 1);

        // Titles
        canvasContext.fillStyle = 'white';
        canvasContext.font = 'bold 25px Sans';
        canvasContext.textAlign = 'right'
        canvasContext.fillText(`LEVEL ${leveling.level}`, 815, 60, 200);

        // Progress bar titles
        canvasContext.fillStyle = 'white';
        canvasContext.font = 'bold 25px Sans';

        canvasContext.textAlign = 'left'
        canvasContext.fillText(interaction.user.displayName, 260, 140);

        canvasContext.textAlign = 'right'
        canvasContext.fillText(`${leveling.xp}/${levelUpMilestone}`, 815, 140);

        // Remove the avatar corners
        canvasContext.beginPath();
        canvasContext.arc(125, 115, 80, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.clip();

        // Add the avatar
        canvasContext.drawImage(avatar, 45, 35, 160, 160);

        await interaction.reply({files: [{ attachment: canvas.toBuffer(), name: 'card.png' }]})
    }
};