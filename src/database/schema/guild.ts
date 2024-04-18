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

    preferences: {
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
        },
    },
    leveling: {
        type: Object,
        default: {
            levelChannelId: null,
            levelRoleIds: [],
        },
    }
});

export const guildModel = mongoose.model('guild', schema, 'guilds')