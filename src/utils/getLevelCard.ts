import {GuildMember} from "discord.js";
import {createCanvas, loadImage} from "canvas";

export async function getLevelCard(member: GuildMember, xp: number, level: number, rankIndex: number, levelUpMilestone: number) {
    const username = member.user.displayName.length > 24 ?
        member.user.displayName.substring(0, 24) + '...' : member.user.displayName;

    const canvas = createCanvas(855, 225);
    const canvasContext = canvas.getContext('2d');

    const barWidth = 540;

    const background = await loadImage('assets/images/level_card_background.png');
    const avatar = await loadImage(member.user.displayAvatarURL({
        extension: 'png', forceStatic: true
    }));

    canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);

    canvasContext.stroke()
    canvasContext.closePath();

    // XP Bar
    canvasContext.lineJoin = 'round';
    canvasContext.lineWidth = 35;

    // Empty XP Bar
    canvasContext.strokeStyle = '#292C32';
    canvasContext.strokeRect(255, 170, barWidth, 1);

    // Filled XP bar
    canvasContext.strokeStyle = '#FFFFFF';
    canvasContext.strokeRect(255, 170, barWidth * xp / levelUpMilestone, 1);

    // Titles
    canvasContext.fillStyle = 'white';
    canvasContext.font = 'bold 25px Sans';
    canvasContext.textAlign = 'right';
    canvasContext.fillText(`LEVEL   ${level}`, 655, 70, 200);
    canvasContext.fillText(`RANK   ${rankIndex}`, 805, 70, 200);

    // Progress bar titles
    canvasContext.fillStyle = 'white';
    canvasContext.font = 'bold 22px Sans';

    canvasContext.textAlign = 'left'
    canvasContext.fillText(username, 245, 140);

    canvasContext.textAlign = 'right'
    canvasContext.fillText(`${xp} / ${levelUpMilestone}`, 800, 140);

    // Remove the avatar corners
    canvasContext.beginPath();
    canvasContext.arc(125, 115, 80.5, 0, 2 * Math.PI);
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = '#292C32';
    canvasContext.stroke();
    canvasContext.closePath();

    // Remove the avatar corners
    canvasContext.beginPath();
    canvasContext.arc(125, 115, 80, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.clip();

    // Add the avatar
    canvasContext.drawImage(avatar, 45, 35, 160, 160);

    return canvas;
}