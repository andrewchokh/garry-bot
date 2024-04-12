import * as dotenv from "dotenv";

dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    MONGO_URI,
} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !MONGO_URI) {
    throw new Error("Missing environment variables.");
}

export const config= {
    discordToken: DISCORD_TOKEN,
    discordClientId: DISCORD_CLIENT_ID,
    mongoUri: MONGO_URI,
};
