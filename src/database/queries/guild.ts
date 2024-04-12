import {guildModel} from "../schema/guild";

export async function fetchOrCreateGuild(guildId: string) {
    const guild = await guildModel.findOne({id: guildId}).lean();

    if (guild) return guild;

    const query = new guildModel({id: guildId});
    await query.save();

    return query;
}