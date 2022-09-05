import { Client, ClientUser } from "discord.js";
import punishmentSchema from "../models/punishment-schema";

export default (client: Client) => {
    client.on('guildMemberAdd', async (member) => {
        const result = await punishmentSchema.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'mute',
        })

        if(result) {
            const mutedRole = member.guild.roles.cache.find(
                (role) => role.name === 'Muted'
            )
            if (mutedRole) {
                member.roles.add(mutedRole)
            }
        }
    })

    const check = async () => {
        const query = {
            expires: { $lt: new Date()}
        }
        const results = await punishmentSchema.find(query)

        for (const result of results) {
            const { guildId, userId, type } = result
            const guild = await client.guilds.fetch(guildId)
            if(!guild) {
                console.log(`Guild "${guildId}" no longer uses this bot`)
                continue
            }

            if (type === 'ban') {
                guild.members.unban(userId, 'Ban expired')
            } else if (type === 'mute') {
                const mutedRole = guild.roles.cache.find((role) => role.name === 'Muted')
                if (!mutedRole) {
                    console.log(`Guild "${guildId}" has no "Muted" Role`)
                    continue
                }

                const member = guild.members.cache.get(userId)
                if(!member) {
                    continue
                }
            } 
        }

        await punishmentSchema.deleteMany(query)

        setTimeout(check, 1000 * 60)
    }
    check()
}

export const config = {
    dbName: 'EXPIRED_PUNISHMENT',
    displayName: 'Expired Punishments',
}

