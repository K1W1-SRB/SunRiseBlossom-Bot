import { ICommand } from "wokcommands";

const pointsSchema = require("../models/points-schema");

export default {
  category: "Configuration",
  description: "Sets up a balance ",

  slash: "both",
  testOnly: true,

  callback: async ({ member }) => {
    let profile = await pointsSchema.create({
      userID: member.id,
      serverID: member.guild.id,
      petals: 0,
    });
    profile.save();

    return "done";
  },
} as ICommand;
