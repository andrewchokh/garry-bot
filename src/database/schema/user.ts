import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },

    levelling: {
        type: Object,
        default: {
            xp: {
                type: Number,
                default: 0
            },
            level: {
                type: Number,
                default: 1
            }
        }
    }
})

export const userModel = mongoose.model('user', schema, 'users')