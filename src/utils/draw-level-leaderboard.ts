import {createCanvas} from "canvas";
import {getMemberName} from "./getMemberName";

const rows: {x: number, y: number}[] = [
    {x: 50, y: 110},
    {x: 50, y: 170},
    {x: 50, y: 230},
    {x: 50, y: 290},
    {x: 50, y: 350},
    {x: 50, y: 410},
    {x: 50, y: 470},
    {x: 50, y: 530},
    {x: 50, y: 590},
    {x: 50, y: 650},
];

export async function drawLevelLeaderboard(leaderboardUsersData: LeaderboardUserData[]) {
    const canvas = createCanvas(850, 820);
    const ctx = canvas.getContext('2d');

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    gradient.addColorStop(0, "#F05E78");
    gradient.addColorStop(1, "#B14592");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Table
    ctx.fillStyle = '#16181D';
    ctx.roundRect(50, 50, canvas.width - 100, canvas.height - 100, [40]);
    ctx.fill();

    ctx.clearRect(50, 110, canvas.width - 100, canvas.height - 250);

    for (let i = 0; i < rows.length; i++) {
        if (i % 2 === 0) ctx.fillStyle = '#62646A';
        else ctx.fillStyle = '#494B51';

        ctx.fillRect(rows[i].x, rows[i].y, canvas.width - 100, 60);
    }

    // Rows of members
    for (let i = 0; i < leaderboardUsersData.length; i++) {
        const member = leaderboardUsersData[i].member;
        const xp = leaderboardUsersData[i].xp;
        const level = leaderboardUsersData[i].level;
        const y = rows[i].y + 37;

        ctx.fillStyle = 'white';
        ctx.font = '20px Sans';
        ctx.textAlign = 'left';
        ctx.fillText(`${i + 1}`, 80, y, 200);
        ctx.fillText(`${getMemberName(member)}`, 200, y, 200);
        ctx.fillText(`${level}`, 460, y, 200);
        ctx.fillText(`${xp}`, 610, y, 200);
    }

    // Column Titles
    ctx.fillStyle = 'white';
    ctx.font = 'bold 22px Sans';
    ctx.textAlign = 'left';
    ctx.fillText('Rank', 80, 90, 200);
    ctx.fillText('Member', 200, 90, 200);
    ctx.fillText('Level', 460, 90, 200);
    ctx.fillText('Experience', 610, 90, 200);

    return canvas;
}