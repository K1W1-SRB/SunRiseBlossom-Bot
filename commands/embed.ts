import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

//embed messages using !embed {json}
export default {
    category: 'embed',
    description: 'Sends an embed',

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message, text }) => {
        const json =JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed

    },
} as ICommand

// Json objects {
//     author?,
//     color?,
//     description?,
//     fields?,
//     fotter?,
//     image?,
//     provider?,
//     thumbnail?,
//     timestamp?,
//     Title?,
//     url?,
//     vidio?,
// }