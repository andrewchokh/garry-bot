import {userModel} from "../schema/user";

export async function fetchOrCreateUser(guildId: string) {
    const guild = await userModel.findOne({id: guildId}).lean();

    if (guild) return guild;

    const query = new userModel({id: guildId});
    await query.save();

    return query;
}

export async function updateUser(userId: string, guildId: string, data: any) {
    await userModel.findOneAndUpdate({id: userId, guildId: guildId}, data, {
        upsert: true,
    });
}