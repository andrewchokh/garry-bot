import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    registeredAt: {
        type: Number,
        default: Date.now(),
    },

    setting: {
        type: Object,
        default: {
            language: 'english',
            botChannelIds: [],
            blacklistedChannelIds: [],
            blacklistedRolesIds: [],
        }
    },
    moderation: {
        type: Object,
        default: {
            muteRoleId: null,
            logChannelId: null,
            levelChannelId: null,
        },
    },
});

export const guildModel = mongoose.model('guild', schema, 'guilds')