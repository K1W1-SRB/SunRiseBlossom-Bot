import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

//embed messages using !embed {json}
export default {
  category: "embed",
  description: "Sends an embed",

  slash: "both",

  permissions: ["ADMINISTRATOR"],

  callback: async ({ interaction, message, text }) => {
    if (!interaction) {
      return "Please Use Prefix";
    }

    const json = JSON.parse(text);

    const embed = new MessageEmbed(json);

    if (!embed) {
      return "Please enter json";
    }

    return embed;
  },
} as ICommand;
