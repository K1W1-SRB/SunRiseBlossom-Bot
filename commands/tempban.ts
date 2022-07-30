import { User } from 'discord.js';
import { ICommand } from "wokcommands";
import punishmentSchema from "../models/punishment-schema";

export default {
    category: 'Moderation',
    description: 'Mutes a user',

    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    maxArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],

    slash: 'both',
    testOnly: true,

    callback:async ({
        args,
        member: staff,
        guild,
        client,
        message,
        interaction,
    }) => {
        if(!guild) {
            return 'You can only use this in a server'
        }

        let userId = args.shift()! //remove the tagged user from the array 
        const duration = args.shift()!
        const reason = args.join(' ')
        let user: User | undefined

        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }

        if (!user) {
            userId = userId.replace(/[<@!>]/g, '')
            user = await client.users.fetch(userId)

            if(!user) {
                return `count not find a user with the id "${userId}"`
            }
        }

        userId = user.id

        let time 
        let type 
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            return "Invalid time format! example format: \"10\" where 'd' = days, 'h' = hours and 'm' = minutes"
        }

        if(type ==='h') {
            time *= 60
        } else if ( type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm'){
            return 'Please use "m", "h", or "d" for minutes hours and days respectively'
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        const result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: 'ban',
        })
        if (result) {
            return `<@${userId}> is already tempbaned in this server.`
        }

        try {
            await guild.members.ban(userId, {days: 7, reason })

            await new punishmentSchema({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'ban',
            }).save()
        } catch (ignored) {
            return 'cannot ban that user'
        }

        return `<@${userId}> has banned for "${duration}"`
    },
} as ICommand