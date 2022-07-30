import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'socials',
    description: 'send a cool button that links to SRB website',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel}) => {

        const linkRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL('https://youtube.com')
                        .setLabel('SRB YouTube')
                        .setStyle('LINK')
                )
                .addComponents(
                    new MessageButton()
                        .setURL('https://k1w1developer.000webhostapp.com/')
                        .setLabel('K1w1 homepage')
                        .setStyle('LINK')
                )

        await msgInt.reply({
            content: 'socials',
            components: [linkRow],
            ephemeral: true,
        })
    },
} as ICommand

//  example code for button that confirs ban of someone

//         const row = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setCustomId('ban_yes')
//                     .setEmoji('🔨')
//                     .setLabel('Confirm')
//                     .setStyle('SUCCESS')
//             )
//             .addComponents(
//                 new MessageButton()
//                     .setCustomId('ban_no')
//                     .setLabel('Cancel')
//                     .setStyle('DANGER')
//             )

//             const filter = (btnInt: ButtonInteraction) => {
//                 return msgInt.user.id === btnInt.user.id
//             }

//             const collector = channel.createMessageComponentCollector({
//                 filter,
//                 max: 1,
//                 time: 1000 * 15
//             })

//             collector.on('collect', (i: ButtonInteraction) => {
//                 i.reply({
//                     content: 'you clicked a button',
//                     ephemeral: true,
//                 })

//             collector.on('end', (Collection) => {
//                 Collection.forEach((click) => {
//                     console.log(click.user.id)
//                 });
//
//             if(collection.first()?.customId === 'ban_yes') {
//                  BAN THE TARGET USER
//                }
//
//             await msgInt.editReply({
//                  content: 'an action has already been taken.',
//                  components: [],
//             })
//
//
//             })
//             })