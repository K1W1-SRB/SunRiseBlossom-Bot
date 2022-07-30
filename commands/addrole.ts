import { Client, GuildMember, Interaction, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Options, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Adds a role to the auto role message',

    permissions: ["ADMINISTRATOR"],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', Interaction => {
            if(!Interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = Interaction

            if(customId === 'auto_roles' && member instanceof GuildMember) {
                const component = Interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                Interaction.reply({
                    content: 'Roles updated',
                    ephemeral: true,
                })
            }
        })
    },

    callback:async ({ message, interaction, args, client  }) => {
        const Channel = (
            message 
             ? message.mentions.channels.first() 
             : interaction.options.getChannel('channel')
        ) as TextChannel
        if(!Channel || Channel.type !== 'GUILD_TEXT') {
            return 'please tag in text channel'
        }

        const messageId = args[1] 

        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if(!role) {
            return 'Unknown role!'
        }

        const targetMessage = await Channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if(!targetMessage) {
            return 'Unknown message ID'
        }

        if(targetMessage.author.id !== client.user?.id) {
            return `Please Provide a message ID that was sent from <@${client.user?.id}`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if(!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] =[{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if(menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return{
                        custom: true,
                        content: `<@${o.value}> is already part of this menu.`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral: true,
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                 .setCustomId('auto_roles')
                 .setMaxValues(0)
                 .setMaxValues(1)
                 .setPlaceholder('Select your roles...')
                 .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: [],
            },
            ephemeral: true,
        }
    },
} as ICommand