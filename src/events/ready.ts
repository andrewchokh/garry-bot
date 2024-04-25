import {Events} from "discord.js";
import {Bot} from "../bot";
import mongoose from "mongoose";
import logger from "../logger";
import {config} from "../config";
import mongoDBConfig from "../config/mongodb.json";
import {deployCommands} from "../utils/deployCommands";
import {rewardMessageSender, rewardVoiceMembers} from "../utils/tasks/rewardWithXP";

async function connectToMongoDB(uri: string, options: any) {
    try {
        await mongoose.connect(uri, options);

        logger.info('Successfully connected to MongoDB.')
    }
    catch (error) {
        logger.error(error);
    }
}

export const event: EventData = {
    name: Events.ClientReady,
    isOnce: true,

    async execute(client: Bot)  {
        logger.info(`Logged in as ${client.user?.tag}`);

        await connectToMongoDB(config.mongoUri, mongoDBConfig);

        await deployCommands(client, config.testGuildId);

        rewardMessageSender();
        rewardVoiceMembers();
    }
}