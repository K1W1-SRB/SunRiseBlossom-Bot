import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'sens a message',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    callback: ({ message, interaction, args }) => {
        const Channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if(!Channel || Channel.type !== 'GUILD_TEXT') {
            return 'please tag in text channel'
        }

        args.shift() //remove the channel from the arguments array
        const text = args.join(' ')

        Channel.send(text)

        if(interaction) {
            interaction.reply({
                content: 'Send message!',
                ephemeral: true
            })
        }
    }
} as ICommand