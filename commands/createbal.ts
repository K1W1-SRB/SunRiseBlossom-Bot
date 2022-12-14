import { ICommand } from "wokcommands";
import pointsSchema from "../models/points-schema";

export default {
  category: "Configuration",
  description: "Sets up a balance ",

  slash: "both",
  testOnly: true,

  callback: async ({ member }) => {
    await pointsSchema.create({
      _id: member.id,
      serverID: member.guild.id,
      petals: 0,
      daily: 0,
    });

    return "done";
  },
} as ICommand;
