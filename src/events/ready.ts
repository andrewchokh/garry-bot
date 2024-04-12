import {Events} from "discord.js";
import {Bot} from "../bot";
import mongoose from "mongoose";
import logger from "../logger";
import {config} from "../config";

async function connectToMongoDB(uri: string) {
    try {
        await mongoose.connect(uri);

        logger.info('Successfully connected to MongoDB.')
    }
    catch (error) {
        logger.error(error)
    }
}

export const data: EventData = {
    name: Events.ClientReady,
    isOnce: true,
    callback: async (client: Bot) => {
        logger.info(`Logged in as ${client.user?.tag}`);

        await connectToMongoDB(config.mongoUri as string);
    }
}