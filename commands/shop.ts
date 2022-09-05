import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import shopSchema from "../models/shop-schema";

export default {
  category: "economy",
  description: "Shows Shop ",

  slash: "both",

  callback: async (message) => {
    const items = await shopSchema.findById(1);

    const embed = new MessageEmbed()
      .setColor("DARK_VIVID_PINK")
      .setTitle("Shop")
      .setDescription("This is a embed for all items in the shop")
      .addFields(items.items);

    return embed;
  },
} as ICommand;
