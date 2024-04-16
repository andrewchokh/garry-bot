import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    registeredAt: {
        type: Number,
        default: Date.now()
    },

    setting: {
        type: Object,
        default: {
            language: {
                type: String,
                default: 'english'
            },
            botChannelIds: {
                type: Array,
                default: [],
            },
            blacklistedChannelIds: {
                type: Array,
                default: [],
            },
            blacklistedRolesIds: {
                type: Array,
                default: [],
            },
        }
    },
    moderation: {
        type: Object,
        default: {
            muteRoleId: {
                type: String,
                default: null
            },
            logChannelId: {
                type: String,
                default: null
            },
        }
    },
})

export const guildModel = mongoose.model('guild', schema, 'guilds')