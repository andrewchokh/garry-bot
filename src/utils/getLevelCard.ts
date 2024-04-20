import {GuildMember} from "discord.js";
import {createCanvas, loadImage} from "canvas";

export async function getLevelCard(member: GuildMember, xp: number, level: number, rankIndex: number, levelUpMilestone: number) {
    const username = member.user.displayName.length > 24 ?
        member.user.displayName.substring(0, 24) + '...' : member.user.displayName;

    const canvas = createCanvas(855, 225);
    const ctx = canvas.getContext('2d');

    const barWidth = 540;

    const background = await loadImage('assets/images/level_card_background.png');
    const avatar = await loadImage(member.user.displayAvatarURL({
        extension: 'png', forceStatic: true
    }));

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.stroke()
    ctx.closePath();

    // XP Bar
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;

    // Empty XP Bar
    ctx.strokeStyle = '#292C32';
    ctx.strokeRect(255, 170, barWidth, 1);

    // Filled XP bar
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(255, 170, barWidth * xp / levelUpMilestone, 1);

    // Titles
    ctx.fillStyle = 'white';
    ctx.font = 'bold 25px Sans';
    ctx.textAlign = 'right';
    ctx.fillText(`LEVEL   ${level}`, 655, 70, 200);
    ctx.fillText(`RANK   ${rankIndex}`, 805, 70, 200);

    // Progress bar titles
    ctx.fillStyle = 'white';
    ctx.font = 'bold 22px Sans';

    ctx.textAlign = 'left'
    ctx.fillText(username, 245, 140);

    ctx.textAlign = 'right'
    ctx.fillText(`${xp} / ${levelUpMilestone}`, 800, 140);

    // Make avatar border
    ctx.beginPath();
    ctx.arc(125, 115, 80.5, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#292C32';
    ctx.stroke();
    ctx.closePath();

    // Remove the avatar corners
    ctx.beginPath();
    ctx.arc(125, 115, 80, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    // Add the avatar
    ctx.drawImage(avatar, 45, 35, 160, 160);

    return canvas;
}