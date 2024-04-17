import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },

    leveling: {
        type: Object,
        default: {
            xp: 0,
            level: 1,
        }
    }
});

export const userModel = mongoose.model('user', schema, 'users')