import {userModel} from "../schema/user";

export async function fetchOrCreateUser(id: string, guildId: string) {
    const user = await userModel.findOne({id: id, guildId: guildId}).lean();

    if (user) return user;

    const query = new userModel({id: id, guildId: guildId});
    await query.save();

    return query;
}

export async function updateUser(userId: string, guildId: string, data: any) {
    await userModel.findOneAndUpdate({id: userId, guildId: guildId}, data, {
        upsert: true,
    });
}